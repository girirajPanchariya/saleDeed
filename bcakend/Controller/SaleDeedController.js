// import PDFDocument from "pdfkit";
// import path from "path";
// import fs from "fs";
// import { unicodeToKrutiDev } from "../utils/krutidevConverter.js";

// export const createSaleDeed = async (req, res) => {
//   try {
//     const {
//       SalerName,
//       BuyerName,
//       PropertyDetails,
//       TransactionDetails,
//       DateOfSale,
//       SalePrice,
//       Witnesses,
//     } = req.body;

//     if (
//       !SalerName ||
//       !BuyerName ||
//       !PropertyDetails ||
//       !TransactionDetails ||
//       !DateOfSale ||
//       !SalePrice ||
//       !Witnesses
//     ) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const doc = new PDFDocument();
    
//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", "attachment; filename=sale_deed.pdf");

//     doc.pipe(res);

//     // ✅ Load Kruti Dev font
//     const fontPath = path.join(process.cwd(), "fonts", "KRDEV010.TTF");
//     doc.font(fontPath);
    
//     // ✅ Convert text before printing
//     doc.fontSize(16).text(unicodeToKrutiDev("nLrkost cS;ukek eky;rh 7]97]000@& :Ik;s"), { align: "center" });

//     doc.moveDown(2);

//     doc.fontSize(12).text(unicodeToKrutiDev(`विक्रेता का नाम ${SalerName}`));
//     doc.text(unicodeToKrutiDev(`क्रेता का नाम ${BuyerName}`));
//     doc.text(unicodeToKrutiDev(`संपत्ति का विवरण ${PropertyDetails}`));
//     doc.text(unicodeToKrutiDev(`लेन-देन का विवरण ${TransactionDetails}`));
//     doc.text(
//       unicodeToKrutiDev(
//         `विक्रय की तारीख ${new Date(DateOfSale).toLocaleDateString()}`
//       )
//     );
//     doc.text(unicodeToKrutiDev(`विक्रय मूल्य ₹${SalePrice}`));

//     const witnessText = Array.isArray(Witnesses)
//       ? Witnesses.join(", ")
//       : Witnesses;

//     doc.text(unicodeToKrutiDev(`गवाह ${witnessText}`));

//     doc.addPage(2)
//     doc.end();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };