const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/nodeCourse', {useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Could not connect to MongoDB...', err));

const CommentSchema = new mongoose.Schema({
  text: String,
  sender: String,
});

const Comment = mongoose.model('comments', CommentSchema);

const Course = mongoose.model(
  'course',
  new mongoose.Schema({
    name: String,
    comments: [CommentSchema], // ایجاد آرایه ای از کامنتها
  }),
);

async function createCourse(name, comments) {
  const course = new Course({
    name,
    comments,
  });

  const result = await course.save();
  console.log(result);
}

// createCourse('NodeJs Api Course',
//  [ // ارسال آرایه‌ای از کامنت‌ها
//   new Comment({
//   text: "very goooooooooooooooooooood",
//   sender: "alireza",
// }),
// new Comment({
//   text: "very niiiiiiiiiiiice",
//   sender: "amnirhosein",
// }),
//   ]
// );

async function updateComment(courseId, commentId, text){
  const result = await Course.updateOne(
    {
      _id: courseId,
      // چون آرایه ای کامنت ها داریم باید اینطوری کامنت مورد نظر را پیدا کنیم
      comments: {
        $elemMatch : { 
          _id : commentId,
        },
      }
    },
    {
      $set: {
        // در اینجا هم چون آرایه ای از کامنتها داریم
        //  مقدار یک کامنت را تغییر دهیم
        // اما mongoose یک قابلیتی دارد که با اضافه کردن یک $ می توانیم مقدار کامنت یافت شده را تغییر دهیم
        "comments.$.text": text,
      }
    }
    );
    console.log(result)
};

// updateComment('6402f2b29336993c40dec24e', '6402f2b29336993c40dec24c', "nice nice nice" )


async function addComment(courseId, text, sender){
  let course = await Course.findById(courseId)
  course.comments.push(
    new Comment({
      text,
      sender
    })
  );
  course = await course.save();
  console.log(course);
};
// addComment('6402f2b29336993c40dec24e', 'خیلی خوب است سپاسگزارم', 'alireza')

async function removeComment(courseId, commentId){
  let course = await Course.findById(courseId);
  let comment = await course.comments.id(commentId);
  comment.remove(); 
  course = await course.save();
  console.log(course);
};

removeComment('6402f2b29336993c40dec24e', '6402f90efae3682a3c4588e5')