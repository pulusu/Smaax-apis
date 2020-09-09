const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    campaign_name: { type: String, required: true },
    campaign_description: { type: String, required: true },
    influencer_requirements: { type: String, required: true },
    mentions_or_hashtags: { type: String },
    tag_people: { type: String },
    giveaways: { type: String },
    attachments: { type: String },
    restrctions: { type: String },
    transparency: { type: String },
    exclusivity: { type: String },
    budget: { type: String, required:true },
    postTypes: [
    { type: mongoose.Schema.ObjectId, ref: 'posttypes' }  ],
    startDate: { type: Date, required:true  },
    endDate: { type: Date },
    campaignObjective: { type: String },
    production: { type: String },
    languages: [
    { type: mongoose.Schema.ObjectId, ref: 'Language' }  ],
    socialPlatform: [
    { type: mongoose.Schema.ObjectId, ref: 'socialPlatforms' }  ],
    number_of_influencer: { type: String },
    min_avg_audience_size_per_influencer: { type: String },
    max_avg_audience_size_per_influencer: { type: String },
    nationalities: [
    { type: mongoose.Schema.ObjectId, ref: 'Nationalities' }  ],
    influencerSpecialization: [
    { type: mongoose.Schema.ObjectId, ref: 'topics' }  ],
    influencerLocation: [
    { type: mongoose.Schema.ObjectId, ref: 'Countries' }  ],
    audienceLocation: [
    { type: mongoose.Schema.ObjectId, ref: 'Locations' }  ],
    audienceLanguage: [
    { type: mongoose.Schema.ObjectId, ref: 'Language' }  ],
    audienceSize: { type: String },
    audienceAge: { type: String },
    audienceGender: { type: String },
    otherInformation: { type: String },
    status: { type: Number, default: 1 },
    createdDate: { type: Date, default: Date.now }
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Campaign', schema);