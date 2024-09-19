const Event = require("../models/event.schema");

const createUi=(req,res)=>{
    res.render("create")
}
const home=async(req,res)=>{
    const { date, location, eventType } = req.query;  
    let filter = {};
  
    if (date) filter.date = { $gte: new Date(date) }; 
    if (location) filter.location = location;
  
    const data = await Event.find(filter); 

    res.render("home",{data})
}

const createEvent=  async (req, res) => {
    const { title, description, date, location, maxAttendees } = req.body;
    

    try {
        const event = new Event({
            title,
            description,
            date,
            location,
            maxAttendees,
            imageUrl:req.file.originalname,
            attendees: req.body.userID,
            createdBy: req.body.userID
        });
        await event.save();
        res.redirect("/event/home")
        
    } catch (error) {
        res.json(error);
    }
}

const rsvpdata = async (req,res)=>{
    const event = await Event.findById(req.params.id);
  if (event.attendees.length >= event.maxAttendees) return res.send('Event is full.');
  
  event.attendees.push(req.body.userID);
  await event.save();
  res.redirect('/event/home');
}

const deletedata = async (req, res) => {
    let { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.redirect("/event/home");
  };


  const editdata = async (req, res) => {
    let { id } = req.params;
    const event = await Event.findById(id);
  
    res.render("edit", { event });
  };


  
  const updatedata = async (req, res) => {
    let { id } = req.params;
    let listing = await Event.findByIdAndUpdate(id, req.body);
    
    res.redirect("/event/home");
  };

module.exports={createUi,createEvent,home,rsvpdata,deletedata,editdata,updatedata}