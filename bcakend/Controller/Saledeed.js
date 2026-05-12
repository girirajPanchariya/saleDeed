import PDFDocument from "pdfkit";
import path from "path";
import SaleDeed from "../Model/UserModel.js";
import { unicodeToKrutiDev } from "../utils/krutidevConverter.js";
import { ToWords } from "to-words";
import { count } from "console";

// ================= CREATE + PDF =================
export const createSaleDeed = async (req, res) => {
  try {
    const data = req.body;


    const doc = new PDFDocument({
      size: "LEGAL",
  layout: "portrait",

  margins: {
    top: 70,
    bottom: 80,
    left: 80,
    right: 72
  },

  info: {
    Title: "Sale Deed",
  }


    });

    // ✅ FIX: Safe error handling
    doc.on("error", (err) => {
      console.error("PDF Error:", err);
      if (!res.writableEnded) {
        res.status(500).send("PDF generation failed");
      }
    });

    // ✅ FIX: handle client close
    res.on("close", () => {
      if (!res.writableEnded) {
        doc.destroy();
      }
    });

    // ✅ headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=sale-deed-.pdf`
    );

    doc.pipe(res);

    // ✅ FIX: correct font path
    const fontPath = path.join(
      process.cwd(),
      "fonts/KRDEV010.TTF"
    );

    doc.font(fontPath);

  
// ================= PAGE NUMBER =================

// ================= PAGE NUMBER =================

// ================= PAGE NUMBER =================

let pageNumber = 0;

function addPageNumber() {

  // Page 1 par number nahi dikhana
  if (pageNumber === 1) return;

  const currentX = doc.x;
  const currentY = doc.y;

  doc.save();

  doc.font(fontPath)
    .fontSize(20)
    .text(
      `${pageNumber}`,
      0,
      20,
      {
        width: doc.page.width,
        align: "center",
        lineBreak: false
      }
    );

  doc.restore();

  doc.x = currentX;
  doc.y = currentY;

  doc.font(fontPath).fontSize(23);
}

// First page
pageNumber = 1;
addPageNumber();

// Every new page
doc.on("pageAdded", () => {

  pageNumber++;

  addPageNumber();

});    // ================= PDF CONTENT =================

    // doc.moveDown(15)

    // doc.fontSize(23).text(unicodeToKrutiDev(` nLrkost cS;ukek eky;rh ${data.amount}@& :Ik;s`), { align: "center",
    //   lineGap: 10
    //  });


    doc.moveDown();
    const sellerCount = (data.seller || []).length;
    const buyerCount = (data.buyer || []).length;

    const haiText = sellerCount > 1 ? "ge" : "eq>";



    // first relation type set first
    const relation = data.seller[0].relation;

    // console.log(relation);

    const firstParty = sellerCount > 1 ? "i{kdkjku" : relation === "iq=" ? "i{kdkj" : "i{kdkjk";

    //second relation type set frist second

    const relationSecond = data.buyer[0].relation;
    console.log(relationSecond);

    const secondparty = buyerCount > 1 ? "i{kdkjku" : relationSecond === "iq=" ? "i{kdkj" : "i{kdkjk";

    console.log(secondparty);

    // in data of 5/8/2026 can set the khasradetial properly this the task on this day
    let khasraContun = 0;
    let totalPopulation = 0;
     let khataShare
        let text;
    const propertyDetials = (data.property.propertyDetails || [])
      .map((item) => {

       khataShare = item.shares;
       let khasraContun = 0;
      let totalPopulation = 0
        const khasraDetails = (item.khasraDetail || [])
          .map((item2) => {

              khasraContun++;
            // console.log(khasraContun);
                totalPopulation += Number(item2.population ||0) 
        console.log("Share:", khataShare);
            return `] [kljk la[;k ${item2.khasraSankhiya} rknknh ${item2.population} gSDVs;j `

          }).join(" ");

          text= "";
                  if (khasraContun > 1) {

            text = `dqy fdrk ${khasraContun} dqy rknknh ${totalPopulation.toFixed(2)} gSDVs;j`;
              
          }
                  console.log(khasraDetails);

        return `[kkrk la[;k ${item.khataSankhiya} ${khasraDetails} ${text} —f"k Hkwfe esa [kkrsnkjh  fLFkr gSA ftlesa eq> izFke i{kdkj dk ${khataShare} fgLlk ntZ gSA`;

      })
      .join(" ");
    //  const propertyDetialMultipleKhata = (data.property.propertyDetails|| []).map((item))
    for (let i = 0; i < data.property.propertyDetails.length; i++) {

      let khasraArray = data.property.propertyDetails[i].khasraDetail;

      for (let j = 0; j < khasraArray.length; j++) {

        totalPopulation = totalPopulation + khasraArray[j].population;

      }
    }

    // const shares = data.property.shares.split("/");


    // const num = (data.property.shares[0]);
    // const des = (data.property.shares[2]);
    // console.log(num);
    // console.log(des);




    // data.area = (totalPopulation * num) / des
    // // share define
    // console.log(totalPopulation.toFixed(2));
    
    const sellingProperty = (data.sellingProperty || []).map((item) => {
      const kharsraTest = (item.khasraDetail || []).map((item2) => {
        return `[kljk [kljk ua- ${item2.khasraSankhiya} rknknh ${item2.population}gSDVs;j —f"k Hkwfe  ${text} —f"k Hkwfe esa [kkrsnkjh  fLFkr gSA ftlesa eq> izFke i{kdkj dk ${khataShare} fgLlk ntZ gSA`
      }

      )
      return `[kkrk la[;k ${item.khataSankhiya} ${kharsraTest}`
    })

    const toWords = new ToWords({
      localeCode: 'hi-IN',
      converterOptions: {
        currency: false,
        ignoreDecimal: true,
        ignoreZeroCurrency: false,
      }
    });
    const amount = (data.transaction.amount)

    let amoutinWord = toWords.convert(amount)
    console.log(amoutinWord);




   let khataTotlePopulation = 0;
let totalArea = 0;
  let khataCount = 0;

let khataDetails;

for (let i = 0; i < data.property.propertyDetails.length; i++) {

  let item = data.property.propertyDetails[i];

  khataDetails = item.khataSankhiya;

  let khataKhasraDetial = item.khasraDetail || [];

  // total population
  let khataTotlePopulation = 0;

  for (let j = 0; j < khataKhasraDetial.length; j++) {

    khataTotlePopulation += Number(
      khataKhasraDetial[j].population || 0
    );
  }

  // share split
  let share = (item.shares || "1/1").split("/");


  let num = Number(share[0]);
  let des = Number(share[1]);

  // khata wise population
  let khataPopulation = khataKhasraDetial.reduce((sum, k) => {

    return sum + Number(k.population || 0);

  }, 0);

  let area = (khataPopulation * num) / des;

  item.area = area.toFixed(3);

  totalArea += area;

  console.log("Khata:", item.khataSankhiya);
  console.log("Area:", item.area);

  // find khata count

  for (let k = 0; k < data.property.propertyDetails.length; k++) {

    if (
      data.property.propertyDetails[k].khataSankhiya ===
      item.khataSankhiya
    ) {

      khataCount++;

    }
  }

}
// let khatashares; 
// if(khataCount === 1){
// khatashares = propertyDetials;
// }else{

//   khatashares  = `[kkrk la[;k 1 [kljk la[;k 101 rknknh 4.5 gSDVs;j [kljk la[;k 102 rknknh 2.25 gSDVs;j fgLlk 1/2 o dqy {ks=Qy 3.375 gSDVs;j

// [kkrk la[;k 2 [kljk la[;k 201 rknknh 6.75 gSDVs;j [kljk la[;k 202 rknknh 1.5 gSDVs;j fgLlk 1/2 o dqy {ks=Qy 4.125 gSDVs;j`
// }
console.log("Khata Count:", khataCount);
    // const khasradetaiText = (data.property.khasraDetail ||[]).map((item)=>
    // `] [kljk la[;k ${item.khasraSankhiya} rknknh ${item.population} gSDVs;j `).join("")

    // console.log("relation:", "[" + relation + "]");

    if (sellerCount >= 4 && sellerCount <= 5 || buyerCount >= 4 && buyerCount <= 5) {

      doc.moveDown(40)

      doc.fontSize(23).text(unicodeToKrutiDev(` nLrkost cS;ukek eky;rh ${data.amount}@& :Ik;s`), {
        align: "center",
        lineGap: 6
      });

      (data.seller || []).forEach((selle, index) => {
        const genderText = selle.relation === "iq=" ? "dk" : "dh";
        doc.moveDown();

        doc
          .fontSize(23)
          .text(
            unicodeToKrutiDev(
              `${index + 1}-  Jh ${selle.sellerName} ${selle.relation} ${selle.sellerFather} mez ${selle.sellerAge} o"kZ tkfr ${selle.cast} fuoklh ${selle.village} rglhy  ${selle.tehsil}, ftyk  ${selle.district} ¼jktLFkku½ ${genderText} gwWA vk-u-%&  ${selle.sellerAadhar}`
            ),
            { lineGap: 6, align: "justify" }
          );
      });
      doc.moveDown()
      doc.moveDown()
      doc.fontSize(23).text(unicodeToKrutiDev(`izFke&${firstParty}`), { align: "right", lineGap: 6 });

      (data.buyer || []).forEach((buye, index) => {
        doc.moveDown();

        doc.fontSize(23).text(unicodeToKrutiDev(
          `${index + 1}- ${buye.buyerName}  iRuh ${buye.buyerHusband} mez  ${buye.buyerAge} o"kZ tkfr ${buye.village} तहसील ${buye.tehsil}, ftyk  ${buye.district} ¼jktLFkku½ dk gwWA vk-u-%&  ${buye.buyerAadhar}`
          ,), { lineGap: 6, align: "justify" });
      });
      doc.moveDown()

      doc.fontSize(23).text(unicodeToKrutiDev("f}rh;&i{kdkjk ¼Øsrk½"), { align: "right", lineGap: 6 });

      doc.moveDown();


      doc.moveDown(2);
      doc.moveDown(2);


      // doc.addPage({
      //     size:"legal",
      //       margins: { top: 50, bottom: 50, left: 72, right: 72 }

      // })



      doc.fontSize(23).text(unicodeToKrutiDev(
        `&tks fd ${haiText} çFke i{kdkj ds uke ls okds xzke ${data.villageName} iVokj gYdk ${data.patwarHalka} Hkw-vfHk-fu- dksyk;r  rglhy ${data.Tehsil} ftyk ${data.dic} ds [ksr [kkrk la[;k ${data.khataSankhiya}] [kljk la[;k ${data.khasraSankhiya} rknknh ${data.population} gSDVs;j  —f"k Hkwfe fLFkr gSA`,

      ), { align: "justify", lineGap: 6 });

      doc.fontSize(23).text(unicodeToKrutiDev(`ftlesa ,d VîqcoSy cuk gqvk gSA ftldk —f"k fo|qr dusD'ku esjs uke ls gS o mä —f"k Hkwfe VîqcoSy ls flafpr gSA ftl ij eSa çFke i{kdkj dkfct o dk'r gw¡ rFkk mä —f"k Hkwfe ckcr [kkrsnkjh gd&gdwd gkfly gS vkSj vius [kkrsnkjh gdksa dks gj çdkj ls jgu cS; djus dk dkuquh vfèkdkj gkfly gS] pw¡fd eq>s bl le; futh ?kjsyw [kpZ ds fy, :i;ksa dh vko';drk gS] vr% mijksä xzke ${data.villageName} ds [kkrk la[;k ${data.khataSankhiya} [kljk [kljk ua- ${data.khasraSankhiya} rknknh ${data.population} gSDVs;j —f"k Hkwfe esa ls eq> çFke i{kdkj ds fgLls ${data.shares} ;kfu ${data.area}gSDVs;j reke flafpr —f"k Hkwfe e; VîqcoSy ds [kkrsnkjh gd&gdwd f}rh; i{kdkjk ${data.buyerName} iq= ${data.buyerHusband} dks eqcfyax :i;k ${data.amount} @& v[kjs  ${data.amountInWords}flQZ esa cS; drbZ djds fy[k nsrk gw¡ fd vkt rd tks gd&gdwd mijksä cS; ${data.area} gSDVs;j flafpr —f"k Hkwfe e; VîqcoSy ckcr eq> foØsrk dks gkfly gS oksg reke gd vkt dh rkjh[k ls [kjhnnkjk dks gkfly gksxk] dCtk ekSdk ij [kjhnnkj dks —f"k Hkwfe esa ços'k djok dj ns fn;k gSA vc mä —f"k Hkwfe e; VîqcoSy ij eq> çFke i{kdkj vkSj esjs okjhlku dk dksbZ vfèkdkj ugh gksxk ] dsoy [kjhnnkj dk —f"k Hkwfe e; VîqcoSy ij vfèkdkj gksxk A 
 	;g —f"k Hkwfe e; VîqcoSy vkt ls iwoZ dgha Hkh jgu] cS; o vU; fdlh çdkj ls eqUrfdy dh gqbZ ugha gS ] cfYd leLr çdkj ls lqjf{kr gS ] vxj fdlh Hkh çdkj dh dksbZ Hkh ftEesokjh ;k dkuwuh [kkeh ;k cdk;k` ), { align: "justify", lineGap: 6 });
      doc.moveDown(2);

      //   doc.addPage({
      //       size:"legal",
      //         margins: { top: 50, bottom: 50, left: 72, right: 72 }
      // })
      doc.fontSize(23).text(unicodeToKrutiDev(`vkfn bl Hkwfe ckcr fudy vkosxh rks eq> çFke i{kdkj foØsrk [kqn dh ftEesokj gksxh] [kjhnnkjk ls mldk dksbZ okLrk ugha gksxkA [kjhnnkjk dks vfèkdkj gksxk dh eq> çFke i{kdkj dh xSj ekStwnxh esa bl nLrkost cS;ukek ds }kjk vius uke ls iVokj dkxtkr esa ukekUrdj.k ¼bUrdky½ vius gLrk{kj ls ntZ djok ldrh gSA vc [kjhnnkjk mä Hkwfe dh iw.kZ :i ls ekfyd o dkfct gksxh rFkk pkgs ftl çdkj ls vius mi;ksx o miHkksx esa ys ldsxh] dk'r vkfn dj ldsxh] jgu&cS; dj ldsxh] ,oa mä —f"k fo|qr dusD'ku [kjhnnkj tfj;s bl foØ; i= ds vius uke ls ifjorZu djok ldrh gS ,oa VîqcoSy dks gj çdkj ls vius mi;ksx esa ys ldsxh] ftlesa eq> çFke i{kdkj foØsrk o esjs okjhlku dks dksbZ vkifÙk o ,srjkt ugha gksxkA 
                tjs cS; :i;k ${data.GivenAmount}@& v[kjs ${data.GivenAmountInWords} :i;s [kjhnnkj ls :&c&: xokgu ds uxn izkIr dj fy;k gSA blds ckn vc mä cS; —f"k Hkwfe e; VîqcoSy ckcr esjh dksbZ çfrQy jkf'k cdk;k ugh gS AHkwfe flafpr gS rFkk lM+d ls nwj fLFkr gSA mä Hkwfe ij fdlh Hkh cSad] ljdkjh laLFkk rFkk vU; fdlh foÙkh; laLFkk }kjk fdlh Hkh çdkj dk dksbZ _.k ugha fy;k gqvk gSA mä —f"k Hkwfe ckcr fdlh Hkh U;k;ky; esa dksbZ okn nk;j ugha gS rFkk uk gh mä Hkwfe ckcr fdlh Hkh U;k;ky; ls LFkxu vkns'k gS A`,), { align: "justify", lineGap: 6 });

      doc.moveDown();
      doc.moveDown()



      //Top Pargraph
      doc.fontSize(23).text(unicodeToKrutiDev(`       fygktk ;g nLrkost cS;ukek eSaus viuh jkth [kq'kh fcuk fdlh u'ks irs lgh fnekx ds lkFk fy[kok fn;k gS fd lun jgs çek.k Lo:i oä t:jr ij dke vkos A rkjh[k 29-10-2025`,), { lineGap: 6 });
      doc.moveDown();

      // pdf kit me colloum setup 3 coloumn setup

      // const pageWidth = doc.page.width;
      // // console.log(pageWidth);
      // const margin = 72;
      // const usableWidth = pageWidth - margin * 2;

      doc.fontSize(23).text(unicodeToKrutiDev(`   gaå xokg              gaå foØsrk            gaå xokg`, {
        coloums: 3,
        align: "justify",
        columnGap: 11,
      }))


      doc.moveDown(2);


      const leftX = 90;
      const rightX = 390; // adjust if needed
      const y = doc.y;

      // LEFT BLOCK
      doc.fontSize(19).text(
        unicodeToKrutiDev(`ikcqnku iq= uoynku mez 52 o"kZ
¼tUe frfFk 09-01-1973½
tkfr pkj.k fuoklh o‚MZ 2,
nklksM+h] chdkusj] jktLFkku
vk- ua- 7114 7535 1383`),
        leftX,
        y,
        {
          width: 220,
          lineGap: 4
        }
      );

      // RIGHT BLOCK
      doc.fontSize(19).text(
        unicodeToKrutiDev(`ikjl pkj.k iq= ikcqnku pkj.k mez 28 o"kZ
¼tUe frfFk 13-02-1997½
tkfr pkj.k fuoklh nklksMh+
rglhy gM+k] ftyk chdkusj
jktLFkku vk- ua- 5774 3931 1786`),
        rightX,
        y,
        {
          width: 220,
          lineGap: 4
        }
      );

      // MOVE DOWN AFTER BOTH BLOCKS
      doc.y = y + 170; // adjust height based on content

      doc.moveDown(2);
      // CENTER TEXT BELOW

      doc.fontSize(19).text(
        unicodeToKrutiDev("gaå Øsrk"),
        0,                 // start from full page
        doc.y,
        {
          width: doc.page.width,   // full width
          align: "center"
        }
      );
    } else if (sellerCount >= 2 && sellerCount <= 3 || buyerCount >= 2 && buyerCount <= 3) {
      doc.moveDown(15)

      doc.fontSize(23).text(unicodeToKrutiDev(` nLrkost cS;ukek eky;rh ${data.amount}@& :Ik;s`), {
        align: "center",
        lineGap: 10
      });

      doc.page.margins = { top: 30, bottom: 80, left: 0, right: 50 };
      (data.seller || []).forEach((selle, index) => {
        doc.moveDown(0.5);
        doc
          .fontSize(23)
          .text(
            unicodeToKrutiDev(
              `${index + 1}-  Jh ${selle.name} ${selle.relation} ${selle.fatherName} mez ${selle.age} o"kZ tkfr ${selle.cast} fuoklh ${selle.village} rglhy  ${selle.tehsil}, ftyk  ${selle.district} ¼jktLFkku½ dk gwWA vk-u-%&  ${selle.sellerAadhar}`
            ),
            { lineGap: 7, align: "justify" }
          );
      });
      doc.moveDown()
      doc.fontSize(23).text(unicodeToKrutiDev("izFke&i{kdkjku ¼foØsrkx.k½"), { align: "right", lineGap: 7 });

      (data.buyer || []).forEach((buye, index) => {
        doc.moveDown(0.5);

        doc.fontSize(23).text(unicodeToKrutiDev(
          `${index + 1}- ${buye.buyerName} iRuh ${buye.buyerHusband} mez  ${buye.buyerAge} o"kZ tkfr ${buye.village} तहसील ${buye.tehsil}, ftyk  ${buye.district} ¼jktLFkku½ dk gwWA vk-u-%&  ${buye.buyerAadhar}`
          ,), { lineGap: 7, align: "justify" });
      });
      doc.moveDown()

      doc.fontSize(23).text(unicodeToKrutiDev("f}rh;&i{kdkjk ¼Øsrk½"), { align: "right", lineGap: 7 });
      doc.moveDown(2);





      // doc.addPage({
      //     size:"legal",
      //       margins: { top: 50, bottom: 50, left: 72, right: 72 }

      // })

      doc.fontSize(23).text(unicodeToKrutiDev(
        `&tks fd eq> çFke i{kdkj ds uke ls okds xzke ${data.villageName} iVokj gYdk ${data.patwarHalka} Hkw-vfHk-fu- dksyk;r  rglhy ${data.Tehsil} ftyk ${data.dic} ds [ksr [kkrk la[;k ${data.khataSankhiya}] [kljk la[;k ${data.khasraSankhiya} rknknh ${data.population} gSDVs;j  —f"k Hkwfe fLFkr gSA`,

      ), { align: "justify", lineGap: 7 });

      doc.fontSize(23).text(unicodeToKrutiDev(`ftlesa ,d VîqcoSy cuk gqvk gSA ftldk —f"k fo|qr dusD'ku esjs uke ls gS o mä —f"k Hkwfe VîqcoSy ls flafpr gSA ftl ij eSa çFke i{kdkj dkfct o dk'r gw¡ rFkk mä —f"k Hkwfe ckcr [kkrsnkjh gd&gdwd gkfly gS vkSj vius [kkrsnkjh gdksa dks gj çdkj ls jgu cS; djus dk dkuquh vfèkdkj gkfly gS] pw¡fd eq>s bl le; futh ?kjsyw [kpZ ds fy, :i;ksa dh vko';drk gS] vr% mijksä xzke ${data.villageName} ds [kkrk la[;k ${data.khataSankhiya} [kljk [kljk ua- ${data.khasraSankhiya} rknknh ${data.population} gSDVs;j —f"k Hkwfe esa ls eq> çFke i{kdkj ds fgLls ${data.shares} ;kfu ${data.area}gSDVs;j reke flafpr —f"k Hkwfe e; VîqcoSy ds [kkrsnkjh gd&gdwd f}rh; i{kdkjk ${data.buyerName} iq= ${data.buyerHusband} dks eqcfyax :i;k ${data.amount} @& v[kjs  ${data.amountInWords}flQZ esa cS; drbZ djds fy[k nsrk gw¡ fd vkt rd tks gd&gdwd mijksä cS; ${data.area} gSDVs;j flafpr —f"k Hkwfe e; VîqcoSy ckcr eq> foØsrk dks gkfly gS oksg reke gd vkt dh rkjh[k ls [kjhnnkjk dks gkfly gksxk] dCtk ekSdk ij [kjhnnkj dks —f"k Hkwfe esa ços'k djok dj ns fn;k gSA vc mä —f"k Hkwfe e; VîqcoSy ij eq> çFke i{kdkj vkSj esjs okjhlku dk dksbZ vfèkdkj ugh gksxk ] dsoy [kjhnnkj dk —f"k Hkwfe e; VîqcoSy ij vfèkdkj gksxk A 
 	;g —f"k Hkwfe e; VîqcoSy vkt ls iwoZ dgha Hkh jgu] cS; o vU; fdlh çdkj ls eqUrfdy dh gqbZ ugha gS ] cfYd leLr çdkj ls lqjf{kr gS ] vxj fdlh Hkh çdkj dh dksbZ Hkh ftEesokjh ;k dkuwuh [kkeh ;k cdk;k` ), { align: "justify", lineGap: 7 });

      //   doc.addPage({
      //       size:"legal",
      //         margins: { top: 50, bottom: 50, left: 72, right: 72 }
      // })
      doc.fontSize(23).text(unicodeToKrutiDev(`vkfn bl Hkwfe ckcr fudy vkosxh rks eq> çFke i{kdkj foØsrk [kqn dh ftEesokj gksxh] [kjhnnkjk ls mldk dksbZ okLrk ugha gksxkA [kjhnnkjk dks vfèkdkj gksxk dh eq> çFke i{kdkj dh xSj ekStwnxh esa bl nLrkost cS;ukek ds }kjk vius uke ls iVokj dkxtkr esa ukekUrdj.k ¼bUrdky½ vius gLrk{kj ls ntZ djok ldrh gSA vc [kjhnnkjk mä Hkwfe dh iw.kZ :i ls ekfyd o dkfct gksxh rFkk pkgs ftl çdkj ls vius mi;ksx o miHkksx esa ys ldsxh] dk'r vkfn dj ldsxh] jgu&cS; dj ldsxh] ,oa mä —f"k fo|qr dusD'ku [kjhnnkj tfj;s bl foØ; i= ds vius uke ls ifjorZu djok ldrh gS ,oa VîqcoSy dks gj çdkj ls vius mi;ksx esa ys ldsxh] ftlesa eq> çFke i{kdkj foØsrk o esjs okjhlku dks dksbZ vkifÙk o ,srjkt ugha gksxkA 
                tjs cS; :i;k ${data.GivenAmount}@& v[kjs ${data.GivenAmountInWords} :i;s [kjhnnkj ls :&c&: xokgu ds uxn izkIr dj fy;k gSA blds ckn vc mä cS; —f"k Hkwfe e; VîqcoSy ckcr esjh dksbZ çfrQy jkf'k cdk;k ugh gS AHkwfe flafpr gS rFkk lM+d ls nwj fLFkr gSA mä Hkwfe ij fdlh Hkh cSad] ljdkjh laLFkk rFkk vU; fdlh foÙkh; laLFkk }kjk fdlh Hkh çdkj dk dksbZ _.k ugha fy;k gqvk gSA mä —f"k Hkwfe ckcr fdlh Hkh U;k;ky; esa dksbZ okn nk;j ugha gS rFkk uk gh mä Hkwfe ckcr fdlh Hkh U;k;ky; ls LFkxu vkns'k gS A`,), { align: "justify", lineGap: 7 });


      doc.moveDown()
      doc.moveDown()

      // doc.addPage({
      //     size:"legal",
      //       margins: { top: 50, bottom: 50, left: 72, right: 72 }
      // }
      // )

      //Top Pargraph
      doc.fontSize(23).text(unicodeToKrutiDev(`       fygktk ;g nLrkost cS;ukek eSaus viuh jkth [kq'kh fcuk fdlh u'ks irs lgh fnekx ds lkFk fy[kok fn;k gS fd lun jgs çek.k Lo:i oä t:jr ij dke vkos A rkjh[k 29-10-2025`,), { lineGap: 7 });
      doc.moveDown(4);

      // pdf kit me colloum setup 3 coloumn setup

      // const pageWidth = doc.page.width;
      // // console.log(pageWidth);
      // const margin = 72;
      // const usableWidth = pageWidth - margin * 2;

      doc.fontSize(23).text(unicodeToKrutiDev(`   gaå xokg              gaå foØsrk            gaå xokg`, {
        coloums: 3,
        align: "justify",
        columnGap: 8,
      }))


      doc.moveDown(2);


      const leftX = 50;
      const rightX = 360; // adjust if needed
      const y = doc.y;

      // LEFT BLOCK
      doc.fontSize(19).text(
        unicodeToKrutiDev(`ikcqnku iq= uoynku mez 52 o"kZ
¼tUe frfFk 09-01-1973½
tkfr pkj.k fuoklh o‚MZ 2,
nklksM+h] chdkusj] jktLFkku
vk- ua- 7114 7535 1383`),
        leftX,
        y,
        {
          width: 220,
          lineGap: 4
        }
      );

      // RIGHT BLOCK
      doc.fontSize(19).text(
        unicodeToKrutiDev(`ikjl pkj.k iq= ikcqnku pkj.k mez 28 o"kZ
¼tUe frfFk 13-02-1997½
tkfr pkj.k fuoklh nklksMh+
rglhy gM+k] ftyk chdkusj
jktLFkku vk- ua- 5774 3931 1786`),
        rightX,
        y,
        {
          width: 220,
          lineGap: 4
        }
      );

      // MOVE DOWN AFTER BOTH BLOCKS
      doc.y = y + 170; // adjust height based on content

      doc.moveDown(2);
      // CENTER TEXT BELOW

      doc.fontSize(19).text(
        unicodeToKrutiDev("gaå Øsrk"),
        0,                 // start from full page
        doc.y,
        {
          width: doc.page.width,   // full width
          align: "center"
        }
      );
    } else if (sellerCount === 1 && buyerCount === 1) {
      doc.moveDown(15)

      doc.fontSize(23).text(unicodeToKrutiDev(` nLrkost cS;ukek eky;rh ${data.transaction.amount}@& :Ik;s`), {
        align: "center",
        lineGap: 10
      });

      (data.seller || []).forEach((selle, index) => {
        doc.moveDown();

        doc
          .fontSize(23)
          .text(
            unicodeToKrutiDev(
              `${index + 1}-  Jh ${selle.name} ${selle.relation} ${selle.fatherName} mez ${selle.age} o"kZ tkfr ${selle.cast} fuoklh ${selle.address.village} rglhy  ${selle.address.tehsil}, ftyk  ${selle.address.district} ¼jktLFkku½ dk gwWA vk-u-%&  ${selle.aadhar}`
            ),
            { lineGap: 10, align: "justify" }
          );
      });
      doc.moveDown()
      doc.fontSize(23).text(unicodeToKrutiDev(`izFke&${firstParty} ¼foØsrkx.k½`), { align: "right", lineGap: 10 });

      (data.buyer || []).forEach((buye, index) => {
        doc.moveDown();

        doc.fontSize(23).text(unicodeToKrutiDev(
          `${index + 1}- ${buye.name} ${buye.relation} ${buye.husbandName} mez  ${buye.age} o"kZ tkfr ${buye.address.village} तहसील ${buye.address.tehsil}, ftyk  ${buye.address.district} ¼jktLFkku½ dk gwWA vk-u-%&  ${buye.aadhar}`
          ,), { lineGap: 10, align: "justify" });
      });
      doc.moveDown()

      doc.fontSize(23).text(unicodeToKrutiDev(`f}rh;& ${secondparty} ¼Øsrk½`), { align: "right", lineGap: 10 });


      doc.fontSize(23).text(unicodeToKrutiDev(
        `&tks fd eq> çFke i{kdkj ds uke ls okds xzke ${data.property.villageName} iVokj gYdk ${data.property.patwarHalka} Hkw-vfHk-fu- dksyk;r  rglhy ${data.property.Tehsil} ftyk ${data.property.dic} ds [ksr   ${propertyDetials}`,


      ), { align: "justify", lineGap: 8 });
      doc.moveDown(2);


      // doc.addPage({
      //   size: "legal",
      //   margins: { top: 50, bottom: 50, left: 72, right: 72 }

      // })
      (data.buyer || []).forEach((buyers, index) => {

        doc.fontSize(23).text(unicodeToKrutiDev(`ftlesa ,d VîqcoSy cuk gqvk gSA ftldk —f"k fo|qr dusD'ku esjs uke ls gS o mä —f"k Hkwfe VîqcoSy ls flafpr gSA ftl ij eSa çFke i{kdkj dkfct o dk'r gw¡ rFkk mä —f"k Hkwfe ckcr [kkrsnkjh gd&gdwd gkfly gS vkSj vius [kkrsnkjh gdksa dks gj çdkj ls jgu cS; djus dk dkuquh vfèkdkj gkfly gS] pw¡fd eq>s bl le; futh ?kjsyw [kpZ ds fy, :i;ksa dh vko';drk gS] vr% mijksä xzke ${data.villageName} ds ${sellingProperty} esa ls eq> çFke i{kdkj ds fgLls ${data.property.shares} ;kfu ${data.area} gSDVs;j reke flafpr —f"k Hkwfe e; VîqcoSy ds [kkrsnkjh gd&gdwd f}rh; i{kdkjk ${buyers.name} iq= ${buyers.husbandName} dks eqcfyax :i;k ${data.transaction.amount} @& v[kjs  ${amoutinWord} flQZ esa cS; drbZ djds fy[k nsrk gw¡ fd vkt rd tks gd&gdwd mijksä cS; ${data.area} gSDVs;j flafpr —f"k Hkwfe e; VîqcoSy ckcr eq> foØsrk dks gkfly gS oksg reke gd vkt dh rkjh[k ls [kjhnnkjk dks gkfly gksxk] dCtk ekSdk ij [kjhnnkj dks —f"k Hkwfe esa ços'k djok dj ns fn;k gSA vc mä —f"k Hkwfe e; VîqcoSy ij eq> çFke i{kdkj vkSj esjs okjhlku dk dksbZ vfèkdkj ugh gksxk ] dsoy [kjhnnkj dk —f"k Hkwfe e; VîqcoSy ij vfèkdkj gksxk A 
      ;g —f"k Hkwfe e; VîqcoSy vkt ls iwoZ dgha Hkh jgu] cS; o vU; fdlh çdkj ls eqUrfdy dh gqbZ ugha gS ] cfYd leLr çdkj ls lqjf{kr gS ] vxj fdlh Hkh çdkj dh dksbZ Hkh ftEesokjh ;k dkuwuh [kkeh ;k cdk;k` ), { align: "justify", lineGap: 10 });
        //selling proprety

      })

      doc.moveDown(2);


      // doc.addPage({
      //   size: "legal",
      //   margins: { top: 50, bottom: 50, left: 72, right: 72 }
      // })
      doc.fontSize(23).text(unicodeToKrutiDev(`vkfn bl Hkwfe ckcr fudy vkosxh rks eq> çFke i{kdkj foØsrk [kqn dh ftEesokj gksxh] [kjhnnkjk ls mldk dksbZ okLrk ugha gksxkA [kjhnnkjk dks vfèkdkj gksxk dh eq> çFke i{kdkj dh xSj ekStwnxh esa bl nLrkost cS;ukek ds }kjk vius uke ls iVokj dkxtkr esa ukekUrdj.k ¼bUrdky½ vius gLrk{kj ls ntZ djok ldrh gSA vc [kjhnnkjk mä Hkwfe dh iw.kZ :i ls ekfyd o dkfct gksxh rFkk pkgs ftl çdkj ls vius mi;ksx o miHkksx esa ys ldsxh] dk'r vkfn dj ldsxh] jgu&cS; dj ldsxh] ,oa mä —f"k fo|qr dusD'ku [kjhnnkj tfj;s bl foØ; i= ds vius uke ls ifjorZu djok ldrh gS ,oa VîqcoSy dks gj çdkj ls vius mi;ksx esa ys ldsxh] ftlesa eq> çFke i{kdkj foØsrk o esjs okjhlku dks dksbZ vkifÙk o ,srjkt ugha gksxkA 
                  tjs cS; :i;k ${data.GivenAmount}@& v[kjs ${data.GivenAmountInWords} :i;s [kjhnnkj ls :&c&: xokgu ds uxn izkIr dj fy;k gSA blds ckn vc mä cS; —f"k Hkwfe e; VîqcoSy ckcr esjh dksbZ çfrQy jkf'k cdk;k ugh gS AHkwfe flafpr gS rFkk lM+d ls nwj fLFkr gSA mä Hkwfe ij fdlh Hkh cSad] ljdkjh laLFkk rFkk vU; fdlh foÙkh; laLFkk }kjk fdlh Hkh çdkj dk dksbZ _.k ugha fy;k gqvk gSA mä —f"k Hkwfe ckcr fdlh Hkh U;k;ky; esa dksbZ okn nk;j ugha gS rFkk uk gh mä Hkwfe ckcr fdlh Hkh U;k;ky; ls LFkxu vkns'k gS A`,), { align: "justify", lineGap: 10 });

      doc.moveDown();
      doc.moveDown()
      doc.moveDown()

      // doc.addPage({
      //   size: "legal",
      //   margins: { top: 50, bottom: 50, left: 72, right: 72 }
      // }
      // )

      //Top Pargraph
      doc.fontSize(23).text(unicodeToKrutiDev(`       fygktk ;g nLrkost cS;ukek eSaus viuh jkth [kq'kh fcuk fdlh u'ks irs lgh fnekx ds lkFk fy[kok fn;k gS fd lun jgs çek.k Lo:i oä t:jr ij dke vkos A rkjh[k 29-10-2025`,), { lineGap: 10 });
      doc.moveDown(4);

      // pdf kit me colloum setup 3 coloumn setup

      // const pageWidth = doc.page.width;
      // // console.log(pageWidth);
      // const margin = 72;
      // const usableWidth = pageWidth - margin * 2;

      doc.fontSize(23).text(unicodeToKrutiDev(`   gaå xokg              gaå foØsrk            gaå xokg`, {
        coloums: 3,
        align: "justify",
        columnGap: 11,
      }))


      doc.moveDown(2);


      const leftX = 40;
      const rightX = 360; // adjust if needed
      const y = doc.y;

      // LEFT BLOCK
      doc.fontSize(19).text(
        unicodeToKrutiDev(`ikcqnku iq= uoynku mez 52 o"kZ
  ¼tUe frfFk 09-01-1973½
  tkfr pkj.k fuoklh o‚MZ 2,
  nklksM+h] chdkusj] jktLFkku
  vk- ua- 7114 7535 1383`),
        leftX,
        y,
        {
          width: 250,
          lineGap: 4
        }
      );

      // RIGHT BLOCK
      doc.fontSize(19).text(
        unicodeToKrutiDev(`ikjl pkj.k iq= ikcqnku pkj.k mez 28 o"kZ
  ¼tUe frfFk 13-02-1997½
  tkfr pkj.k fuoklh nklksMh+
  rglhy gM+k] ftyk chdkusj
  jktLFkku vk- ua- 5774 3931 1786`),
        rightX,
        y,
        {
          width: 250,
          lineGap: 4
        }
      );

      // MOVE DOWN AFTER BOTH BLOCKS
      doc.y = y + 160; // adjust height based on content

      doc.moveDown(2);
      // CENTER TEXT BELOW

      doc.fontSize(19).text(
        unicodeToKrutiDev("gaå Øsrk"),
        0,                 // start from full page
        doc.y,
        {
          width: doc.page.width,   // full width
          align: "center"
        }
      );
    }

    //     (data.seller || []).forEach((selle, index) => {
    //   doc.moveDown();

    //       if(index <= 1){
    //   doc.fontSize(23).text(unicodeToKrutiDev(

    //     `${index + 1}-  Jh ${selle.sellerName} पुत्र ${selle.sellerFather} mez ${selle.sellerAge} o"kZ tkfr ${selle.cast} fuoklh ${selle.village} rglhy  ${selle.tehsil}, ftyk  ${selle.district} ¼jktLFkku½ dk gwWA vk-u-%&  ${selle.sellerAadhar}`
    //    ,{
    //    }),{lineGap: 10, align: "justify"});
    //   }
    // });


    //     doc.moveDown()
    //     doc.moveDown()
    //     doc.fontSize(23).text(unicodeToKrutiDev("izFke&i{kdkjku ¼foØsrkx.k½"),{align:"right",lineGap: 10});

    //     (data.buyer || []).forEach((buye, index) => {
    //     doc.moveDown();

    //     doc.fontSize(23).text(unicodeToKrutiDev(
    //       `${index + 1}- ${buye.buyerName} iRuh ${buye.buyerHusband} mez  ${buye.buyerAge} o"kZ tkfr ${buye.village} तहसील ${buye.tehsil}, ftyk  ${buye.district} ¼jktLFkku½ dk gwWA vk-u-%&  ${buye.buyerAadhar}`
    //     ,),{lineGap: 10, align: "justify"});
    //     });
    //      doc.moveDown()
    //     doc.moveDown()

    //     doc.fontSize(23).text(unicodeToKrutiDev("f}rh;&i{kdkjk ¼Øsrk½"),{align:"right",lineGap: 10});

    //     doc.moveDown();

    //     doc.fontSize(23).text( unicodeToKrutiDev(
    //       `&tks fd eq> çFke i{kdkj ds uke ls okds xzke ${data.villageName} iVokj gYdk ${data.patwarHalka} Hkw-vfHk-fu- dksyk;r  rglhy ${data.Tehsil} ftyk ${data.dic} ds [ksr [kkrk la[;k ${data.khataSankhiya}] [kljk la[;k ${data.khasraSankhiya} rknknh ${data.population} gSDVs;j  —f"k Hkwfe fLFkr gSA`,

    //     ),{ align: "justify",lineGap: 10 });
    //     doc.moveDown(2);
    //     doc.moveDown(2);


    //     doc.addPage({
    //         size:"legal",
    //           margins: { top: 50, bottom: 50, left: 72, right: 72 }

    //     })
    //     doc.fontSize(23).text(unicodeToKrutiDev('1'),{align:"right",lineGap: 10});
    //     doc.fontSize(23).text(unicodeToKrutiDev(`ftlesa ,d VîqcoSy cuk gqvk gSA ftldk —f"k fo|qr dusD'ku esjs uke ls gS o mä —f"k Hkwfe VîqcoSy ls flafpr gSA ftl ij eSa çFke i{kdkj dkfct o dk'r gw¡ rFkk mä —f"k Hkwfe ckcr [kkrsnkjh gd&gdwd gkfly gS vkSj vius [kkrsnkjh gdksa dks gj çdkj ls jgu cS; djus dk dkuquh vfèkdkj gkfly gS] pw¡fd eq>s bl le; futh ?kjsyw [kpZ ds fy, :i;ksa dh vko';drk gS] vr% mijksä xzke ${data.villageName} ds [kkrk la[;k ${data.khataSankhiya} [kljk [kljk ua- ${data.khasraSankhiya} rknknh ${data.population} gSDVs;j —f"k Hkwfe esa ls eq> çFke i{kdkj ds fgLls ${data.shares} ;kfu ${data.area}gSDVs;j reke flafpr —f"k Hkwfe e; VîqcoSy ds [kkrsnkjh gd&gdwd f}rh; i{kdkjk ${data.buyerName} iq= ${data.buyerHusband} dks eqcfyax :i;k ${data.amount} @& v[kjs  ${data.amountInWords}flQZ esa cS; drbZ djds fy[k nsrk gw¡ fd vkt rd tks gd&gdwd mijksä cS; ${data.area} gSDVs;j flafpr —f"k Hkwfe e; VîqcoSy ckcr eq> foØsrk dks gkfly gS oksg reke gd vkt dh rkjh[k ls [kjhnnkjk dks gkfly gksxk] dCtk ekSdk ij [kjhnnkj dks —f"k Hkwfe esa ços'k djok dj ns fn;k gSA vc mä —f"k Hkwfe e; VîqcoSy ij eq> çFke i{kdkj vkSj esjs okjhlku dk dksbZ vfèkdkj ugh gksxk ] dsoy [kjhnnkj dk —f"k Hkwfe e; VîqcoSy ij vfèkdkj gksxk A 
    //  	;g —f"k Hkwfe e; VîqcoSy vkt ls iwoZ dgha Hkh jgu] cS; o vU; fdlh çdkj ls eqUrfdy dh gqbZ ugha gS ] cfYd leLr çdkj ls lqjf{kr gS ] vxj fdlh Hkh çdkj dh dksbZ Hkh ftEesokjh ;k dkuwuh [kkeh ;k cdk;k` ) , { align: "justify",lineGap: 10 });
    //     doc.moveDown(2);

    //     doc.addPage({
    //         size:"legal",
    //           margins: { top: 50, bottom: 50, left: 72, right: 72 }
    //   })
    //     doc.fontSize(23).text(unicodeToKrutiDev(`vkfn bl Hkwfe ckcr fudy vkosxh rks eq> çFke i{kdkj foØsrk [kqn dh ftEesokj gksxh] [kjhnnkjk ls mldk dksbZ okLrk ugha gksxkA [kjhnnkjk dks vfèkdkj gksxk dh eq> çFke i{kdkj dh xSj ekStwnxh esa bl nLrkost cS;ukek ds }kjk vius uke ls iVokj dkxtkr esa ukekUrdj.k ¼bUrdky½ vius gLrk{kj ls ntZ djok ldrh gSA vc [kjhnnkjk mä Hkwfe dh iw.kZ :i ls ekfyd o dkfct gksxh rFkk pkgs ftl çdkj ls vius mi;ksx o miHkksx esa ys ldsxh] dk'r vkfn dj ldsxh] jgu&cS; dj ldsxh] ,oa mä —f"k fo|qr dusD'ku [kjhnnkj tfj;s bl foØ; i= ds vius uke ls ifjorZu djok ldrh gS ,oa VîqcoSy dks gj çdkj ls vius mi;ksx esa ys ldsxh] ftlesa eq> çFke i{kdkj foØsrk o esjs okjhlku dks dksbZ vkifÙk o ,srjkt ugha gksxkA 
    //                 tjs cS; :i;k ${data.GivenAmount}@& v[kjs ${data.GivenAmountInWords} :i;s [kjhnnkj ls :&c&: xokgu ds uxn izkIr dj fy;k gSA blds ckn vc mä cS; —f"k Hkwfe e; VîqcoSy ckcr esjh dksbZ çfrQy jkf'k cdk;k ugh gS AHkwfe flafpr gS rFkk lM+d ls nwj fLFkr gSA mä Hkwfe ij fdlh Hkh cSad] ljdkjh laLFkk rFkk vU; fdlh foÙkh; laLFkk }kjk fdlh Hkh çdkj dk dksbZ _.k ugha fy;k gqvk gSA mä —f"k Hkwfe ckcr fdlh Hkh U;k;ky; esa dksbZ okn nk;j ugha gS rFkk uk gh mä Hkwfe ckcr fdlh Hkh U;k;ky; ls LFkxu vkns'k gS A`,),{ align: "justify",lineGap: 10 });

    //     doc.moveDown();
    //     doc.moveDown()
    //     doc.moveDown()

    //     doc.addPage({
    //         size:"legal",
    //           margins: { top: 50, bottom: 50, left: 72, right: 72 }
    //     }
    //     )

    //     //Top Pargraph
    //     doc.fontSize(23).text(unicodeToKrutiDev(`       fygktk ;g nLrkost cS;ukek eSaus viuh jkth [kq'kh fcuk fdlh u'ks irs lgh fnekx ds lkFk fy[kok fn;k gS fd lun jgs çek.k Lo:i oä t:jr ij dke vkos A rkjh[k 29-10-2025`,),{lineGap: 10});
    //     doc.moveDown(6);

    // // pdf kit me colloum setup 3 coloumn setup

    // // const pageWidth = doc.page.width;
    // // // console.log(pageWidth);
    // // const margin = 72;
    // // const usableWidth = pageWidth - margin * 2;

    //     doc.fontSize(23).text(unicodeToKrutiDev(`   gaå xokg              gaå foØsrk            gaå xokg`,{
    //       coloums:3,
    //       align:"justify",
    //       columnGap:11,
    //     }))


    //     doc.moveDown(2);


    //   const leftX = 90;
    // const rightX = 390; // adjust if needed
    // const y = doc.y;

    // // LEFT BLOCK
    // doc.fontSize(19).text(
    //   unicodeToKrutiDev(`ikcqnku iq= uoynku mez 52 o"kZ
    // ¼tUe frfFk 09-01-1973½
    // tkfr pkj.k fuoklh o‚MZ 2,
    // nklksM+h] chdkusj] jktLFkku
    // vk- ua- 7114 7535 1383`),
    //   leftX,
    //   y,
    //   {
    //     width: 220,
    //     lineGap: 4
    //   }
    // );

    // // RIGHT BLOCK
    // doc.fontSize(19).text(
    //   unicodeToKrutiDev(`ikjl pkj.k iq= ikcqnku pkj.k mez 28 o"kZ
    // ¼tUe frfFk 13-02-1997½
    // tkfr pkj.k fuoklh nklksMh+
    // rglhy gM+k] ftyk chdkusj
    // jktLFkku vk- ua- 5774 3931 1786`),
    //   rightX,
    //   y,
    //   {
    //     width: 220,
    //     lineGap: 4
    //   }
    // );

    // // MOVE DOWN AFTER BOTH BLOCKS
    // doc.y = y + 170; // adjust height based on content

    // doc.moveDown(2);
    // // CENTER TEXT BELOW

    // doc.fontSize(19).text(
    //   unicodeToKrutiDev("gaå Øsrk"),
    //   0,                 // start from full page
    //   doc.y,
    //   {
    //     width: doc.page.width,   // full width
    //     align: "center"
    //   }
    // );
    doc.end();
  } catch (error) {
    console.error(error);
    if (!res.writableEnded) {
      res.status(500).json({ error: error.message });
    }
  }
};







// ================= ALL PDF =================
// export const getAllSaleDeedsPDF = async (req, res) => {
//   try {
//     const deeds = await SaleDeed.find().sort({ createdAt: -1 });

//     const doc = new PDFDocument({ margin: 50 });

//     doc.on("error", (err) => {
//       console.error(err);
//       if (!res.writableEnded) {
//         res.status(500).send("PDF error");
//       }
//     });

//     res.on("close", () => {
//       if (!res.writableEnded) {
//         doc.destroy();
//       }
//     });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader(
//       "Content-Disposition",
//       "attachment; filename=sale-deeds.pdf"
//     );

//     doc.pipe(res);

//     const fontPath = path.join(
//       process.cwd(),
//       "fonts/NotoSansDevanagari-Regular.ttf"
//     );
//     doc.font(fontPath);

//     deeds.forEach((deed, index) => {
//       const { seller, buyer, property, transaction } = deed;

//       doc.fontSize(14).text("बैनामा / विक्रय पत्र", { align: "center" });

//       doc.moveDown();

//       doc.text(unicodeToKrutiDev()`कुल राशि ₹${transaction?.amount}/- मात्र`);

//       doc.moveDown();

//       doc.text(unicodeToKrutiDev()
//         `1- ${seller?.name} पुत्र ${seller?.fatherName} उम्र ${seller?.age} वर्ष निवासी ग्राम ${seller?.address?.village}, तहसील ${seller?.address?.tehsil}, जिला ${seller?.address?.district} (आधार संख्या ${seller?.aadhar})`
//       );
//       doc.text(unicodeToKrutiDev()"प्रथम पक्षकार – विक्रेता");

//       doc.moveDown();

//       doc.text(unicodeToKrutiDev()
//         `1- ${buyer?.name} पत्नी ${buyer?.husbandName} उम्र ${buyer?.age} वर्ष निवासी ग्राम ${buyer?.address?.village}, तहसील ${buyer?.address?.tehsil}, जिला ${buyer?.address?.district} (आधार संख्या ${buyer?.aadhar})`
//       );
//       doc.text(unicodeToKrutiDev()"द्वितीय पक्षकार – क्रेता");

//       doc.moveDown();

//       doc.fontSize(11).text(
//         `यह कि मैं प्रथम पक्षकार अपनी कृषि भूमि, जिसका विवरण खसरा संख्या ${property?.khasraNumber} एवं क्षेत्रफल ${property?.area} है, को अपनी आवश्यकता के कारण द्वितीय पक्षकार को विक्रय करता हूँ।

// यह भूमि पूर्ण रूप से मेरे स्वामित्व में है और किसी भी प्रकार के ऋण, विवाद या बंधक से मुक्त है।

// अतः मैं उक्त भूमि को ₹${transaction?.amount}/- में विक्रय करता हूँ जिसकी पूरी राशि मुझे प्राप्त हो चुकी है।

// दिनांक ${new Date(transaction?.date).toLocaleDateString("hi-IN")} से इस भूमि का पूर्ण अधिकार क्रेता के पास होगा।

// भविष्य में किसी भी प्रकार का विवाद होने पर उसकी जिम्मेदारी मेरी होगी।

// यह दस्तावेज मैंने अपनी स्वेच्छा से एवं बिना किसी दबाव के तैयार किया है।`,
//         { align: "justify" }
//       );

//       doc.moveDown(2);

//       doc.text(unicodeToKrutiDev()"विक्रेता हस्ताक्षर: ____________________");
//       doc.text(unicodeToKrutiDev()"क्रेता हस्ताक्षर: ____________________");

//       doc.moveDown();
//       doc.text(unicodeToKrutiDev()"गवाह 1: ____________________");
//       doc.text(unicodeToKrutiDev()"गवाह 2: ____________________");

//       if (index !== deeds.length - 1) {
//         doc.addPage();
//       }
//     });

//     doc.end();
//   } catch (error) {
//     console.error(error);
//     if (!res.writableEnded) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// };