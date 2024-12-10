const Story = require('../models/story');

const uploadStory = async (req, res) => {
   const { title, nodes, edges } = req.body;
   const userId = req.user._id;

   try {

      const existingStoryByTitle = await Story.findOne({ title, createdBy: userId });
      if (existingStoryByTitle) {
         return res.status(400).json({ message: 'A story with the same title already exists for this user.' });
      }

      //in the future implementation to detect that no story is just copied
      const existingStory = await Story.findOne({ nodes });
      if (existingStory) {
         return res.status(400).json({ message: 'A story with the same plot already exists. Please do not plagarize.' });
      }

      const story = new Story({
         title,
         nodes,
         edges,
         createdBy: userId,
      });

      await story.save();
      res.status(201).json({ message: 'Story uploaded successfully!', story });
   } catch (error) {
      res.status(500).json({ message: 'Error uploading story', error: error.message });
   }
};


const getStoryById = async (req, res) => {
   const { id } = req.params;

   try {
      const story = await Story.findById(id);

      if (!story) {
         return res.status(404).json({ message: 'Story not found' });
      }

      res.status(200).json(story);
   } catch (error) {
      res.status(500).json({ message: 'Error retrieving story', error: error.message });
   }
};

const getRandomStories = async (req, res) => {
   const { page = 1, limit = 9 } = req.query;

   try {
      const skip = (page - 1) * limit;

      const stories = await Story.aggregate([
         {
            $lookup: {
               from: 'users',
               localField: 'createdBy',
               foreignField: '_id',
               as: 'userInfo',
            },
         },
         {
            $unwind: {
               path: '$userInfo',
               preserveNullAndEmptyArrays: true,
            },
         },
         {
            $project: {
               _id: 1,
               createdBy: 1,
               username: { $ifNull: ['$userInfo.username', null] },
               title: 1,
               intro: {
                  $arrayElemAt: [
                     {
                        $filter: {
                           input: '$nodes',
                           as: 'node',
                           cond: { $eq: ['$$node.id', '0'] },
                        },
                     },
                     0,
                  ],
               },
            },
         },
         {
            $project: {
               _id: 1,
               createdBy: 1,
               username: 1,
               title: 1,
               intro: {
                  $cond: {
                     if: { $ne: ['$intro', null] },
                     then: { $ifNull: ['$intro.data.cardText', ''] },
                     else: '',
                  },
               },
            },
         },
      ])
         .skip(skip)
         .limit(parseInt(limit, 10));

      const formattedStories = stories.map(story => ({
         id: story._id,
         userId: story.createdBy,
         username: story.username,
         title: story.title,
         intro: story.intro,
      }));

      const count = await Story.countDocuments();
      res.status(200).json({ stories: formattedStories, totalStories: count });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving stories', error: error.message });
   }
};

module.exports = {
   uploadStory,
   getStoryById,
   getRandomStories,
};