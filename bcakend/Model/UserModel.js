import mongoose from "mongoose";

const saleDeedSchema = new mongoose.Schema(
  {
    seller: [{
      name: { type: String, required: true },
      fatherName: { type: String },
      cast: { type: String },
      age: { type: Number },
      relation: { type: String, enum: ["ifRu", "iq="] },
      aadhar: { type: String, required: true },
      address: {
        village: String,
        tehsil: String,
        district: String
      }
    }],

    buyer: [{
      name: { type: String, required: true },
      husbandName: { type: String },
      age: { type: Number },
      relation: { type: String, enum: ["ifRu", "iq="] },
      aadhar: { type: String, required: true },
      address: {
        village: String,
        tehsil: String,
        district: String
      }
    }],

    property: {
      villageName: {
        type: String,
      },
      patwarHalka: {
        type: String,

      },
      Tehsil: {
        type: String
      },
      dic: {
        type: String
      },
      propertyDetails: [{
        khataSankhiya: {
          type: Number
        },
        khasraDetail: [{
          khasraSankhiya: Number,
          population: Number
        }],
        shares:String,
      }],

      // shares: {
      //   type: String
      // },
      area: { type: Number, }



    },

    sellingProperty: [
      {
        khataSankhiya: Number,

        khasraDetail: [
          {
            khasraSankhiya: Number,
            population: Number
          }
        ]
      }
    ],

    transaction: {
      amount: { type: Number, required: true },
      amountInWords: String,
      GivenAmount: Number,
      GivenAmountInWords: String,
      paymentMode: {
        type: String,
        enum: ["cash", "online", "cheque"],
        default: "cash"
      },
      date: { type: Date, required: true }
    },

    witnesses: [
      {
        name: String,
        age: Number,
        aadhar: String,
        address: String
      }
    ],


  },
  { timestamps: true }
);

const SaleDeed = mongoose.model("SaleDeed", saleDeedSchema);

export default SaleDeed;