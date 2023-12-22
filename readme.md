data association:
- ek model se dusre model ke data ko jod dena ID ke through
ye maily 2 models ke beech chalta hai, ek ki id dusre ke pas and vice versa 

<!-- steps for projects  -->
1. lets ask chatgpt to create a mongoose model which contains details :
username, passwords, posts which is in array format, dp, email and full name.

aisa karne se ek model create ho jayega user wala, ab bhai dusre model ki bari:

2. post ka model 
create a model for posts which will consist of post-texts, current date and time when post was published, no.of likes

ab jab ye bann jaye uske baad ek route banau jisme ek user ban jaye default type 

3. bhaisaab ab humne kya kiya jo post model banaya tha na usko ab ek route bana ke check kara aur humne ye dekha kii waha ki bhi ek unique id hai,
fir humne dekh liya ki agar hum :
 user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 
  }
aise karke ID pass karde to humare pas id aa jayegi user ki! Likinnn mongoose ko kaise pata chalega ki ye user ki id hai?
uske liye hum use krenge 
<!-- ref -->

reference dene se fyda hai ye janab ki hume pata hai : ki data base kaha se reference lega....

4. humne users mei post banaya tha na, likin usme user ki id har bar kaise jayegi?
uske liye humne :

router.get("/createpost", async function (req, res) {
  let createdpost = await postModel.create({
    postText: "HEllo everyone! This is his post text. ",
    <!-- user:"6582a02ee4aaa460d7e0652c", -->
});
  userModel.findOne({_id: "6582a02ee4aaa460d7e0652c"});
  user.posts.push(createdpost._id);
  await user.save();
  res.send("Done") 
});
=====================================================================
i). pehle user ki id createpost wale mei push kari
ii). fir findOne use karke humne ID deke find kar liya 
iii). users wale page mei //(createuser)// uss post id ko push kar diya aur save kar diya...


ek kaam kar na bhai profile wala page bana hai tu todha sa research maar aur acha sa bana ye jo banaya haai acha nahi hai...