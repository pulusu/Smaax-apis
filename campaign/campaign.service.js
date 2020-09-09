const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const db = require('_helpers/db');
const Campaign = db.Campaign;
const Attachments = db.Attachments;
const SocialPlatforms = db.SocialPlatforms;
const PostTypes = db.PostTypes;
const Language = db.Language;
const Countries = db.Countries;
const Locations = db.Locations;
const Nationalities = db.Nationalities;
const Topics = db.Topics;



module.exports = {
    getAll,
    dropdowns,
    getById,
    create,
    update,
    delete: _delete
};



async function getAll() {
	return await  Campaign.aggregate([
      { 
		"$lookup":{
            "from": "attachments",
            "localField": "_id",
            "foreignField":"post_id",
            "as": "attachments"
        }
	 },
     { 
		"$lookup":{
            "from": "languages",
            "localField": "audienceLanguage",
            "foreignField":"_id",
            "as": "audienceLanguage"
        }
	 },
     { 
		"$lookup":{
            "from": "nationalities",
            "localField": "nationalities",
            "foreignField":"_id",
            "as": "nationalities"
        }
	 },
     { 
		"$lookup":{
            "from": "countries",
            "localField": "influencerLocation",
            "foreignField":"_id",
            "as": "influencerLocation"
        }
	 },
     { 
		"$lookup":{
            "from": "topics",
            "localField": "influencerSpecialization",
            "foreignField":"_id",
            "as": "influencerSpecialization"
        }
	 },
	 { 
		"$lookup":{
            "from": "locations",
            "localField": "audienceLocation",
            "foreignField":"_id",
            "as": "audienceLocation"
        }
	 },
	 {  
		"$lookup":{
            "from": "posttypes",
            "localField": "postTypes",
            "foreignField":"_id",
            "as": "posttypes"
        }
	 },
	 {  
		"$lookup":{
            "from": "socialplatforms",
            "localField": "socialPlatform",
            "foreignField":"_id",
            "as": "socialPlatform"
        }
	 },
	  {
        "$project": {
          "_id": 1,
          "campaign_name": 1,
          "campaign_description": 1,
          "influencer_requirements": 1,
          "mentions_or_hashtags": 1,
          "tag_people": 1,
          "giveaways": 1,
          "restrctions": 1,
          "transparency": 1,
          "exclusivity": 1,
          "budget": 1,
          "startDate": 1,
          "endDate": 1,
          "campaignObjective": 1,
          "production": 1,
          "number_of_influencer": 1,
          "min_avg_audience_size_per_influencer": 1,
          "max_avg_audience_size_per_influencer": 1,
          "audienceSize": 1,
          "audienceAge": 1,
          "audienceGender": 1,
          "createdDate": 1,
          "otherInformation": 1,
          "attachments._id": 1,
          "attachments.attachment_name": 1,
          "nationalities.nationalities_name": 1,
          "influencerLocation.country_name": 1,
          "posttypes.postType_name": 1,
          "audienceLocation.location_name": 1,
          "influencerSpecialization.topic_name": 1,
          "socialPlatform.socialPlatform_name": 1,
          "audienceLanguage.language_name": 1
         } 
      }
]);
     
}

async function dropdowns() {
		
	var obj = {};  
	obj['Nationalities']= await Nationalities.find();
	obj['PostTypes']= await PostTypes.find();
	obj['SocialPlatforms']= await SocialPlatforms.find();
	obj['Languages']= await Language.find();
	obj['Countries']= await Countries.find();
	obj['Locations']= await Locations.find();
	obj['Topics']= await Topics.find();
	return obj;
}
async function getById(id) {
	  const ObjectId = mongoose.Types.ObjectId;
   	return await  Campaign.aggregate([
      { $match : { _id :ObjectId(id) } },
      { 
		"$lookup":{
            "from": "attachments",
            "localField": "_id",
            "foreignField":"post_id",
            "as": "attachments"
        }
	 },
     { 
		"$lookup":{
            "from": "languages",
            "localField": "audienceLanguage",
            "foreignField":"_id",
            "as": "audienceLanguage"
        }
	 },
     { 
		"$lookup":{
            "from": "nationalities",
            "localField": "nationalities",
            "foreignField":"_id",
            "as": "nationalities"
        }
	 },
     { 
		"$lookup":{
            "from": "countries",
            "localField": "influencerLocation",
            "foreignField":"_id",
            "as": "influencerLocation"
        }
	 },
     { 
		"$lookup":{
            "from": "topics",
            "localField": "influencerSpecialization",
            "foreignField":"_id",
            "as": "influencerSpecialization"
        }
	 },
	 { 
		"$lookup":{
            "from": "locations",
            "localField": "audienceLocation",
            "foreignField":"_id",
            "as": "audienceLocation"
        }
	 },
	 {  
		"$lookup":{
            "from": "posttypes",
            "localField": "postTypes",
            "foreignField":"_id",
            "as": "posttypes"
        }
	 },
	 {  
		"$lookup":{
            "from": "socialplatforms",
            "localField": "socialPlatform",
            "foreignField":"_id",
            "as": "socialPlatform"
        }
	 },
	  {
        "$project": {
          "_id": 1,
          "campaign_name": 1,
          "campaign_description": 1,
          "influencer_requirements": 1,
          "mentions_or_hashtags": 1,
          "tag_people": 1,
          "giveaways": 1,
          "restrctions": 1,
          "transparency": 1,
          "exclusivity": 1,
          "budget": 1,
          "startDate": 1,
          "endDate": 1,
          "campaignObjective": 1,
          "production": 1,
          "number_of_influencer": 1,
          "min_avg_audience_size_per_influencer": 1,
          "max_avg_audience_size_per_influencer": 1,
          "audienceSize": 1,
          "audienceAge": 1,
          "audienceGender": 1,
          "createdDate": 1,
          "otherInformation": 1,
          "attachments._id": 1,
          "attachments.attachment_name": 1,
          "nationalities.nationalities_name": 1,
          "influencerLocation.country_name": 1,
          "posttypes.postType_name": 1,
          "audienceLocation.location_name": 1,
          "influencerSpecialization.topic_name": 1,
          "socialPlatform.socialPlatform_name": 1,
          "audienceLanguage.language_name": 1
         } 
      }
]);
 
}

async function create(userParam,files) {
    // validate
   	console.log('upload-serice',files);

    const campaign = new Campaign(userParam);
   // return campaign;
    // save campaign
     const campaign_data = await campaign.save();
	
	files.forEach(function(item, index, array) {
	 const attach = new Attachments();
	 attach.post_id = campaign_data.id;
	 attach.attachment_name = item.path;
	 attach.post_type = 'attachments';	
	 attach.save()
	
	})
	 
	return campaign_data
	 
}

async function update(id, userParam) {
    const campaign = await Campaign.findById(id);

    // validate
    if (!campaign) throw 'Campaign not found';
    if (campaign.country_name !== userParam.country_name && await Campaign.findOne({ country_name: userParam.country_name })) {
        throw 'Campaign "' + userParam.country_name + '" is already taken';
    }

    // copy userParam properties to campaign
    Object.assign(campaign, userParam);

    await campaign.save();
}

async function _delete(id) {
    await Campaign.findByIdAndRemove(id);
}