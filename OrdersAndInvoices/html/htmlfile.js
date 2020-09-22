import { getLocalizedJsonInvoice } from "../../constants/ConvertJsonName";
import { DateTimeCustom } from "../../constants/DateTime";





LineY = 330
widthGap = 180
LineX = 483
LineHeith = 38

export const InvoiceZPL = (navigationParams, tenantProfile, cartItems, InvoiceNumber, CreationDate, ) => {
    // console.log(cartItems)
    PartyName = getLocalizedJsonInvoice(navigationParams.PartyName)
    let Status = navigationParams.Status
     console.log('TAx Card',tenantProfile.tenantTaxCard);

    if (Status === 'Invoice') {
        Status = 'فاتورة'
    } else {
        Status = 'طلب'

    }

    let ZPL = '^XA^CI28^CW1,E:TT0003M_.FNT' +
        '^FO243,50^A1,45,58^FD' + Status + '^FS' +
        '^FO223,100^A1,45,38^FD' + PartyName + '^FS' +
        '^FO480,160^A1,28,27^FDم.ض :^FS' +
        '^FO439,160^A1,28,27^FD' + tenantProfile.tenantTaxFile + '^FS' +
        '^FO482,185^A1,28,27^FDس.ت :^FS' +
        '^FO439,185^A1,28,27^FD' + tenantProfile.tenantRegFile + '^FS' +
        '^FO482,223^A1,28,27^FDب.ض :^FS' +
        '^FO330,223^A1,28,27^' + tenantProfile.tenantTaxCard + '^FS' +
        '^FO431,261^A1,28,27^FDرقم الفاتورة :^FS' +
        '^FO370,261^A1,28,27^FD' + InvoiceNumber + '^FS' +
        '^FO420,299^A1,28,27^FDتاريخ الفاتورة :^FS' +
        '^FO159,299^A1,28,27^FD' + CreationDate + '^FS' +
        '^FO12,335^A0N,26,26^FH^FD----------------------------^FS'
    cartItems.forEach(element => {
        LineX = 483
        LineY += LineHeith
        // 
        var packsZPL = '';
        ZPL += '^FO140,' + LineY + '^A1,28,27^FD' + getLocalizedJsonInvoice(element.DisplayName) + ':' + element.ItemCode + '^FS'
        LineY += LineHeith


        element.Packs.forEach(element2 => {
            if (element2.SelectedQuantity != 0) {
            //    console.log("LinxBefore", LineX);

                packsZPL += '^FO' + LineX + ',' + LineY + '^A1,28,27^FD' + '( '+element2.SelectedQuantity +' )'+ " " + getLocalizedJsonInvoice(element2.Title) + '^FS'
                LineX -= widthGap

           //     console.log("Packs", element2.Title + '  Items:  ' + element.DisplayName);

            }
        //    console.log("LinxAfter", LineX);

        })

        LineY += LineHeith

        ZPL += packsZPL +
            '^FO485,' + LineY + '^A1,28,27^FDالسعر^FS' +
            '^FO306,' + LineY + '^A1,28,27^FDاجمالى الخصم^FS' +
            '^FO170,' + LineY + '^A1,28,27^FDالضرائب^FS' +
            '^FO40,' + LineY + '^A1,31,20^FDالصافى^FS'
        LineY += LineHeith
        ZPL +=

            '^FO485,' + LineY + '^A1,28,27^FD ' + element.TotalPrice + '^FS' +
            '^FO356,' + LineY + '^A1,28,27^FD' + element.TotalDeduction + '^FS' +
            '^FO170,' + LineY + '^A1,28,27^FD' + element.TotalTax + '^FS' +
            '^FO40,' + LineY + '^A1,28,27^FD' + element.NetPrice + '^FS'
        LineY += LineHeith

        ZPL +=
            '^FO14,' + LineY + '^A0N,26,26^FH^FD----------------------------^FS'

        //  '^FO73,' + LineY + '^GB400,0,4^FS'
    });

    LineY += LineHeith

    ZPLfooter =
        '^FO445,' + LineY + '^A1,31,20^FDمجموع الضرائب :^FS' +
        '^FO340,' + LineY + '^A1,28,27^FD' + navigationParams.TotalCartTax + '^FS'

    LineY += LineHeith
    ZPLfooter +=
        '^FO448,' + LineY + '^A1,31,20^FDصافى الخصم :^FS'
        + '^FO360,' + LineY + '^A1,28,27^FD' + navigationParams.TotalCartDeduction + '^FS'

    LineY += LineHeith
    ZPLfooter +=

        '^FO488,' + LineY + '^A1,31,20^FDالصافى :^FS'
        + '^FO360,' + LineY + '^A1,28,27^FD' + navigationParams.NetCartPrice + '^FS'

   LineY += LineHeith
    ZPLfooter +=


        // +'^FO20,' + LineY + '^A3,15,10^FDPowered by Zebra Technologies ZPL - Dreem Mashreq Group^FS' +
        '^LL' + LineY
        + '^PQ1,0,1,Y^XZ'


    ZPL += ZPLfooter

    return ZPL
};














export const InvoiceHtml = (PrinterType, navigationParams, tenantProfile, cartItems, InvoiceNumber, ArabicPrice, CreationDate, MobileRefNo, userHeaderInfo, SalesMan) => {
    // console.log(cartItems)
    var PartyName = getLocalizedJsonInvoice(navigationParams.PartyName)
    var Status = navigationParams.Status
    if (Status === 'Invoice') {
        Status = 'فاتورة'
    } else {
        Status = 'طلب'

    }


    if (PrinterType === '3INCH') {

        html = ` <!DOCTYPE html>
        <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Document</title>
            <style>
                p{margin : 0}
            </style>
        </head>
    
        <body>
            <div style="direction: ltr ; textAlign:right ; padding:0 10px ; paddingHorizontal:10 ; text-align:right ; backgroundColor:#fff" >
            <h2 style=" textAlign:center; text-align : center; font-size:50px;fontSize:20">`+ Status + `</h2>  
            <h2 style=" textAlign:center; text-align : center; font-size:30px;fontSize:17">`+ PartyName + `</h2>
       
          <small>م.ض : `+ tenantProfile.tenantTaxFile + `</small> <br>
          <small>س.ت : `+ tenantProfile.tenantRegFile + ` </small> 
          <small>ب.ض : `+ tenantProfile.tenantTaxCard + `</small> <br>
            
          <div style="direction: ltr ; textAlign:right ; text-align:right ; backgroundColor:#fff" >
          <small>رقم الفاتورة : `+ InvoiceNumber + ` </small> <br>
          <small>تاريخ الفاتورة : `+ CreationDate + `</small> <br>
      </div>
  `

        cartItems.forEach(element => {


            // 
            packshtml = '';
            //    console.log(element)
            html += `

         
 <div style="background: ghostwhite;backgroundColor : ghostwhite; padding: 20px ;padding:10;direction: ltr ;marginBottom:10;margin-bottom:10px;margin-top:15px;">
 <div style="padding-bottom: 15px;margin-bottom: 10px;">
     <p style="direction: rtl ;textAlign:right;fontSize:12; font-size:12px;margin:0 ">`+ element.ItemCode + ':' + getLocalizedJsonInvoice(element.DisplayName) + `</p>
`

            element.Packs.forEach(element2 => {
                if (element2.SelectedQuantity != 0) {
                    packshtml += `<p>` + element2.SelectedQuantity + " " + getLocalizedJsonInvoice(element2.Title) + `</p>`
                }
            })


            html += packshtml + ` 
<div style=" display: flex;flexDirection:row-reverse ;justifyContent:space-between;alignItems:center;
 justify-content:space-between; text-align: center;textAlign:center;direction: rtl ;margin-top:15px">

 <div style="textAlign:center">
 <small>الضرائب </small><br>
 <small>`+ element.TotalTax + `</small><br>
  </div>
 
  <div style="textAlign:center">
  <small>اجمالي الخصم </small><br>
  <small>`+ element.TotalDeduction + `</small><br>
  </div>
     
 <div style="textAlign:center">
 <small> السعر </small><br>
 <small>`+ element.TotalPrice + `</small><br>
</div>
</div>
</div>
<div style="border-bottom: 1px solid darkgrey; border-top: 1px solid darkgrey;padding-top: 10px;padding-bottom:10px;marginBottom:10;margin-bottom:15px;
borderBottomWidth:1;borderTopWidth:1;paddingVertical:10; marginTop : 0;margin-top:0">
<strong style="font-size: 15px;">الصافي : `+ element.NetPrice + `</strong>
</div>

`;



        });


        htmlfooter = `  
<div>
    <strong >مجموع الضرائب : ` + navigationParams.TotalCartTax + `</strong> <br>
    <strong >صافي الخصم :`     + navigationParams.TotalCartDeduction + `</strong> <br>
    <strong >الصافي : `        + navigationParams.NetCartPrice + `</strong> <br>
</div>
</div>
</div>
</body>
</html>
`


        html += htmlfooter
    } else {

        html = `<!DOCTYPE html>
        <html lang="en">
        
        <!--head>
            // <meta charset="UTF-8">
            // <meta name="viewport" content="width=device-width, initial-scale=1.0">
            // <meta http-equiv="X-UA-Compatible" content="ie=edge">
            
        </head-->
        
        <body>
            <div style="direction: rtl;text-align: right;">
                <div style="display:flex;max-width: 95%;margin:0 auto;font-weight: bold;">
                    <p style="font-size: 11px;fontSize:11">تاريخ الطباعه : `+ DateTimeCustom() + `</p>
                </div>
                <h2 style="text-align:center; margin: 20px 0 10px;textAlign:center;">`+ Status + `مبيعات</h2>
                <div
                    style="background:#ebebeb;padding:1rem 10%;display:flex;margin: auto;margin-bottom: 1rem; font-weight: bold;font-size: 11px;">
                    <div style="flex-basis: 50%;">
                        <p style="margin:0;">الشركه: `+ getLocalizedJsonInvoice(tenantProfile.jsonName) + `</p>
                        <p style="margin:0;">مسلسل: `+ InvoiceNumber + `</p style="font-size: 11px;">
                        <p style="margin:0;">العميل : `+ PartyName + " " + navigationParams.PartyID + `</p style="font-size: 11px;">
                        <p style="margin:0;">المخزن : `+ userHeaderInfo.sec_SalesPersonCode + `</p style="font-size: 11px;">
        
                    </div>
                    <div style="flex-basis: 50%;">
                        <p style="margin:0;">رقم الفاتوره اليدوي : `+ MobileRefNo + `</p>
                        <p style="margin:0;">تاريخ الفاتوره : `+ CreationDate + `</p>
                        <p style="margin:0;">المندوب : `+ getLocalizedJsonInvoice(SalesMan) + " " + userHeaderInfo.sec_SalesPersonCode + `</p style="font-size: 11px;">
                        <p style="margin:0;">الحاله : `+ Status + ` </p style="font-size: 11px;">
                    </div>
 
                </div>
                <div style=" padding: 13px 5px; width: 100%; margin:10px auto;">
                    <table style="border-collapse: collapse;background: #f9f9f9;width: 100%; font-size: 11px;">
                        <thead style="text-align: center;font-weight: bold;border: 1px solid;background:#b1b1b1">

                            <tr>
                                <td style="text-align: center;width: 10%;border-left: 1px solid #808080;">كود الصنف</td>
                                <td style="width: 18%;border-left: 1px solid #808080;">اسم الصنف</td>
                                <td style="width: 4%;border-left: 1px solid #808080;">كميه</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">الوحده</td>
                                <td style="width: 4%;border-left: 1px solid #808080;">كميه</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">الوحده</td>
                                <td style="width: 4%;border-left: 1px solid #808080;">كميه</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">الوحده</td>
                                <td style="width: 10%%;border-left: 1px solid #808080;">الاجمالي</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم الحمله</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم اضافي</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم نقدي</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم جمله</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">ضرائب</td>
                                <td style="width: 10%;border-left: 1px solid #808080;">الصافي</td>
                            </tr>
                        </thead>
                        <tbody style="text-align: right;border: 1px solid;">`
        TotalPrice = 0.0
        Totalpromod = 0.0
        TotalOtherDis = 0.0
        Totalcashd = 0.0
        Totalwsd = 0.0
        TotalTax = 0.0
        TotalNetPrice = 0.0
        cartItems.forEach(element => {
            console.log(element.OtherDis)

            TotalPrice = parseFloat(TotalPrice) + parseFloat(element.TotalPrice)
            Totalpromod = parseFloat(Totalpromod) + parseFloat(element.promod)
            TotalOtherDis = parseFloat(TotalOtherDis) + parseFloat(element.OtherDis)
            Totalcashd = parseFloat(Totalcashd) + parseFloat(element.cashd)
            Totalwsd = parseFloat(Totalwsd) + parseFloat(element.wsd)
            TotalTax = parseFloat(TotalTax) + parseFloat(element.TotalTax)
            TotalNetPrice = parseFloat(TotalNetPrice) + parseFloat(element.NetPrice)
            // 
            packshtml = '';
            //    console.log(element)
            html += `
                            <tr style="border-bottom : 1px solid;">
                            
                                <td style="text-align:center;width: 10%;border-left: 1px solid #808080;">`+ element.ItemCode + `</td>
                                <td style="width: 18%;border-left: 1px solid #808080;font-size:9px;">`+ getLocalizedJsonInvoice(element.DisplayName) + `</td>`

            element.Packs.forEach(element2 => {
                if (element2.SelectedQuantity != 0) {
                    packshtml += `<td style="width: 4%;border-left: 1px solid #808080;">` + element2.SelectedQuantity + `</td> 
                                    <td style="width: 5%;border-left: 1px solid #808080;">`+ getLocalizedJsonInvoice(element2.Title) + `</td>`
                }
                else {
                    packshtml += `<td style="width: 4%;border-left: 1px solid #808080;"></td> 
                    <td style="width: 5%;border-left: 1px solid #808080;"></td>`

                }

            })

            if (element.Packs.length == 2) {
                packshtml += `<td style="width: 4%;border-left: 1px solid #808080;"></td> 
                <td style="width: 5%;border-left: 1px solid #808080;"></td>`
            }
            if (element.Packs.length == 1) {
                packshtml += `
                <td style="width: 4%;border-left: 1px solid #808080;"></td> 
                <td style="width: 5%;border-left: 1px solid #808080;"></td>
                <td style="width: 4%;border-left: 1px solid #808080;"></td> 
                <td style="width: 5%;border-left: 1px solid #808080;"></td>`
            }


            html += packshtml + ` 
                                <td style="width: 10%;border-left: 1px solid #808080;">`+ element.TotalPrice + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">` + element.promod + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">` + element.OtherDis + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">` + element.cashd + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">` + element.wsd + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">` + element.TotalTax + `</td>
                                <td style="width: 10%;border-left: 1px solid #808080;">`+ element.NetPrice + `</td>
                            </tr>`})

        TotalInfo = `

                        </tbody>
                    </table>
                    <table style="width: 100%; text-align:right;border-collapse: collapse;font-size: 11px;">
                        <tbody style="border: 1px solid;">
                            <tr>
                                <td
                                    style="width: calc(54% + 7px);border-left: 1px solid #808080;text-align: center;font-weight: bold;padding:.5rem 0">
                                    الاجمالي</td>
                                <td style="width:10%;border-left: 1px solid #808080;">`+ parseFloat(TotalPrice).toFixed(2) + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(Totalpromod).toFixed(2) + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(TotalOtherDis).toFixed(2) + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(Totalcashd).toFixed(2) + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(Totalwsd).toFixed(2) + `</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(TotalTax).toFixed(2) + `</td>
                                <td style="width: 10%;border-left: 1px solid #808080;">`+ parseFloat(TotalNetPrice).toFixed(2) + `</td>
                            </tr>
                        </tbody>
                    </table>
                    <table style="width: 100%; text-align:center;border-collapse: collapse;margin-top: 2rem;">
                        <thead style="border: 1px solid;">
                        <tbody style="border: 1px solid;background:#b1b1b1">
                            <tr>
                                <td style="width: 15%;border-left: 1px solid #808080;"> اجمالي الفاتوره  </td>
                                <td style="text-align:right;width: 60%;border-left: 1px solid #808080;">`+ ArabicPrice + `</td>
                                <td style="width: 25%;border-left: 1px solid #808080;">`+ navigationParams.NetCartPrice + `</td>
                            </tr>
                        </tbody>
                    </table>`

        htmlfooter = TotalInfo + `
                    <table style="width: 100%; text-align:center;border-collapse: collapse;">
                        <thead style="border: 1px solid;background:#b1b1b1">
                            <tr>
                                <td style="width: 15%;border-left: 1px solid #808080;">ﺍﻟﺴﺠﻞ ﺍﻟﺘﺠﺎﺭﻯ </td>
                                <td style="width: 15%;border-left: 1px solid #808080;"> ﺍﻟﺒﻄﺎﻗﺔ ﺍﻟﻀﺮﻳﺒﻴﺔ </td>
                                <td style="width: 15%;border-left: 1px solid #808080;"> ﺍﻟﻤﻠﻒ ﺍﻟﻀﺮﻳﺒﻲ </td>
                                <td style="width: 30%;border-left: 1px solid #808080;">ﺍلعنوان</td>
                                <td style="width: 25%;border-left: 1px solid #808080;">ﺍﻟﺘﻠﻴﻔﻮﻥ </td>
                            </tr>
                        </thead>
                        <tbody style="border: 1px solid;">
                            <tr>
                                <td style="width: 15%;border-left: 1px solid #808080;">`+ tenantProfile.tenantRegFile + ` </td>
                                <td style="width: 15%;border-left: 1px solid #808080;">`+ tenantProfile.tenantTaxCard + `</td>
                                <td style="width: 15%;border-left: 1px solid #808080;">`+ tenantProfile.tenantTaxFile + `</td>
                                <td style="width: 30%;border-left: 1px solid #808080;">`+ tenantProfile.tenantAddress + `</td>
                                <td style="width: 25%;border-left: 1px solid #808080;">`+ tenantProfile.tenantMobile + `</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
        
        </html>`

        html += htmlfooter

    }






    return html
};













export const OperationHtml = (PrinterType, InvoiceData, tenantProfile, userHeaderInfo, SalesMan) => {
    // console.log(cartItems)
    PartyName = getLocalizedJsonInvoice(InvoiceData.PartyName)

    Status = InvoiceData.Status
    if (Status === 'Invoice') {
        Status = 'فاتورة'
    } else {
        Status = 'طلب'

    }


    if (PrinterType === '3INCH') {
        html = ` <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            p{margin : 0}
        </style>
    </head>

    <body>
        <div style="direction: ltr ; textAlign:right ; padding:0 10px ; paddingHorizontal:10 ; text-align:right ; backgroundColor:#fff" >
        <h2 style=" textAlign:center; text-align : center; font-size:50px;fontSize:20">`+ Status + `</h2>  
        <h2 style=" textAlign:center; text-align : center; font-size:30px;fontSize:17">`+ PartyName + `</h2>
            <small>م.ض : `+ InvoiceData.TaxFile + `</small> <br>
            <small>س.ت : `+ InvoiceData.TenantRegFile + ` </small> <br>
            <small>ب.ض : `+ InvoiceData.TaxCard + `</small> <br>
            
            <div style="direction: ltr ; textAlign:right ; text-align:right ; backgroundColor:#fff" >
                <small>رقم الفاتورة : `+ InvoiceData.SSONum + ` </small> <br>
                <small>تاريخ الفاتورة : `+ InvoiceData.InvoiceCreationDate + `</small> <br>
            </div>
        `

        InvoiceData.Items.forEach(element => {


            // 
            packshtml = '';
            //    console.log(element)
            html += `

 <div style="background: ghostwhite;backgroundColor : ghostwhite; padding: 20px ;padding:10;direction: ltr ;marginBottom:10;margin-bottom:10px;margin-top:15px;">
               <div style="padding-bottom: 15px;margin-bottom: 10px;">
                   <p style="direction: rtl ;textAlign:right;fontSize:12; font-size:12px;margin:0 ">`+ element.ItemCode + ':' + getLocalizedJsonInvoice(element.DisplayName) + `</p>
        `

            element.Packs.forEach(element2 => {
                if (element2.SelectedQuantity != 0) {
                    packshtml += `<p>` + element2.SelectedQuantity + " " + getLocalizedJsonInvoice(element2.Title) + `</p>`
                }
            })


            html += packshtml + ` 
                   <div style=" display: flex;flexDirection:row-reverse ;justifyContent:space-between;alignItems:center;
                    justify-content:space-between; text-align: center;textAlign:center;direction: rtl ;margin-top:15px">
                  
                    <div style="textAlign:center">
                    <small>الضرائب </small><br>
                    <small>`+ element.TotalTax + `</small><br>
                     </div>
                    
                     <div style="textAlign:center">
                     <small>اجمالي الخصم </small><br>
                     <small>`+ element.TotalDeduction + `</small><br>
                     </div>
                        
                    <div style="textAlign:center">
                    <small> السعر </small><br>
                    <small>`+ element.TotalPrice + `</small><br>
                </div>
                   </div>
               </div>
               <div style="border-bottom: 1px solid darkgrey; border-top: 1px solid darkgrey;padding-top: 10px;padding-bottom:10px;marginBottom:10;margin-bottom:15px;
               borderBottomWidth:1;borderTopWidth:1;paddingVertical:10; marginTop : 0;margin-top:0">
            <strong style="font-size: 15px;">الصافي : `+ element.NetPrice + `</strong>
        </div>
   
 `;


        });


        htmlfooter = `  
<div>
    <strong>مجموع الضرائب : `+ InvoiceData.TotalInvoiceTax + `</strong> <br>
    <strong>صافي الخصم :`+ InvoiceData.TotalInvoiceDeduction + `</strong> <br>
    <strong>الصافي : `+ InvoiceData.TotalInvoiceNet + `</strong> <br>
</div>
</div>
</div>
</body>
</html>
`


        html += htmlfooter
    } else {

        html = `<!DOCTYPE html>
        <html lang="en">
        
        <!--head>
            // <meta charset="UTF-8">
            // <meta name="viewport" content="width=device-width, initial-scale=1.0">
            // <meta http-equiv="X-UA-Compatible" content="ie=edge">
            
        </head-->
        
        <body>
            <div style="direction: rtl;text-align: right;">
                <div style="display:flex;max-width: 95%;margin:0 auto;font-weight: bold;">
                    <p style="font-size: 11px;fontSize:11">تاريخ الطباعه : `+ DateTimeCustom() + `</p>
                </div>
                <h2 style="text-align:center; margin: 20px 0 10px;textAlign:center;">`+ Status + `مبيعات</h2>
                <div
                style="background:#ebebeb;padding:1rem 10%;display:flex;margin: auto;margin-bottom: 1rem; font-weight: bold;font-size: 11px;">
                <div style="flex-basis: 50%;">
                        <p style="margin:0;>الشركه: `+ getLocalizedJsonInvoice(tenantProfile.jsonName) + `</p>
                        <p style="margin:0;>مسلسل: `+ InvoiceData.SSONum + `</p style="font-size: 11px;">
                        <p style="margin:0;>العميل : `+ getLocalizedJsonInvoice(InvoiceData.PartyName) + " " + InvoiceData.PartyCode + `</p style="font-size: 11px;">
                        <p style="margin:0;>المخزن : `+ userHeaderInfo.sec_SalesPersonCode + `</p style="font-size: 11px;">
        
                    </div>
                    <div style="flex-basis: 50%;">                       
                         <p style="margin:0;>رقم الفاتوره اليدوي : `+ InvoiceData.MobileRefNo + `</p>
                         <p style="margin:0;>تاريخ الفاتوره : `+ InvoiceData.InvoiceCreationDate + `</p>
                         <p style="margin:0;>المندوب : `+ getLocalizedJsonInvoice(SalesMan) + " " + userHeaderInfo.sec_SalesPersonCode + `</p style="font-size: 11px;">
                         <p style="margin:0;>الحاله : `+ Status + ` </p style="font-size: 11px;">
                    </div>
        
                </div>
                <div style=" padding: 13px 5px; width: 100%; margin:10px auto;">
                    <table style="border-collapse: collapse;background: #f9f9f9;width: 100%; font-size: 11px;">
                        <thead style="text-align: center;font-weight: bold;border: 1px solid;background:#b1b1b1">

                            <tr>
                                <td style="text-align: center;width: 10%;border-left: 1px solid #808080;">كود الصنف</td>
                                <td style="width: 18%;border-left: 1px solid #808080;">اسم الصنف</td>
                                <td style="width: 4%;border-left: 1px solid #808080;">كميه</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">الوحده</td>
                                <td style="width: 4%;border-left: 1px solid #808080;">كميه</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">الوحده</td>
                                <td style="width: 4%;border-left: 1px solid #808080;">كميه</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">الوحده</td>
                                <td style="width: 10%%;border-left: 1px solid #808080;">الاجمالي</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم الحمله</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم اضافي</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم نقدي</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">خصم جمله</td>
                                <td style="width: 5%;border-left: 1px solid #808080;">ضرائب</td>
                                <td style="width: 10%;border-left: 1px solid #808080;">الصافي</td>
                            </tr>
                        </thead>
                        <tbody style="text-align: right;border: 1px solid;">`

        TotalPrice = 0.0
        Totalpromod = 0.0
        TotalOtherDis = 0.0
        Totalcashd = 0.0
        Totalwsd = 0.0
        TotalTax = 0.0
        TotalNetPrice = 0.0
        InvoiceData.Items.forEach(element => {
            console.log(element)

            TotalPrice = parseFloat(TotalPrice) + parseFloat(element.TotalPrice)
            Totalpromod = parseFloat(Totalpromod) + parseFloat(element.promod)
            TotalOtherDis = parseFloat(TotalOtherDis) + parseFloat(element.OtherDis)
            Totalcashd = parseFloat(Totalcashd) + parseFloat(element.cashd)
            Totalwsd = parseFloat(Totalwsd) + parseFloat(element.wsd)
            TotalTax = parseFloat(TotalTax) + parseFloat(element.TotalTax)
            TotalNetPrice = parseFloat(TotalNetPrice) + parseFloat(element.NetPrice)
            // 
            packshtml = '';
            //    console.log(element)
            html += `
            <tr style="border-bottom : 1px solid;">                            
            <td style="text-align:center;width: 10%;border-left: 1px solid #808080;">`+ element.ItemCode + `</td>
            <td style="width: 18%;border-left: 1px solid #808080;font-size:9px;">`+ getLocalizedJsonInvoice(element.ItemName) + `</td>`

            element.Packs.forEach((element2, i) => {
                if (element2.SelectedQuantity != 0) {
                    packshtml += `<td style="width: 4%;border-left: 1px solid #808080;">` + element2.SelectedQuantity + `</td> 
                                  <td style="width: 5%;border-left: 1px solid #808080;">`+ getLocalizedJsonInvoice(element2.Title) + `</td>`
                }
                else {
                    packshtml += `<td style="width: 4%;border-left: 1px solid #808080;"></td> 
                    <td style="width: 5%;border-left: 1px solid #808080;"></td>`

                }
            })

            if (element.Packs.length == 2) {
                packshtml += `<td style="width: 4%;border-left: 1px solid #808080;"></td> 
                <td style="width: 5%;border-left: 1px solid #808080;"></td>`
            }
            if (element.Packs.length == 1) {
                packshtml += `
                <td style="width: 4%;border-left: 1px solid #808080;"></td> 
                <td style="width: 5%;border-left: 1px solid #808080;"></td>
                <td style="width: 4%;border-left: 1px solid #808080;"></td> 
                <td style="width: 5%;border-left: 1px solid #808080;"></td>`
            }

            html += packshtml + ` 
                                 <td style="width: 10%;border-left: 1px solid #808080;">`+ element.TotalPrice + `</td>
                                 <td style="width: 5%;border-left: 1px solid #808080;">` + element.promod + `</td>
                                 <td style="width: 5%;border-left: 1px solid #808080;">` + element.OtherDis + `</td>
                                 <td style="width: 5%;border-left: 1px solid #808080;">` + element.cashd + `</td>
                                 <td style="width: 5%;border-left: 1px solid #808080;">` + element.wsd + `</td>
                                 <td style="width: 5%;border-left: 1px solid #808080;">` + element.TotalTax + `</td>
                                 <td style="width: 10%;border-left: 1px solid #808080;">`+ element.NetPrice + `</td>
                            </tr>`})

        TotalInfo = `

        </tbody>
        </table>
        <table style="width: 100%; text-align:right;border-collapse: collapse;font-size: 11px;">
            <tbody style="border: 1px solid;">
                <tr>
                    <td
                        style="width: calc(54% + 7px);border-left: 1px solid #808080;text-align: center;font-weight: bold;padding:.5rem 0">
                        الاجمالي</td>
                    <td style="width:10%;border-left: 1px solid #808080;">`+ parseFloat(TotalPrice).toFixed(2) + `</td>
                    <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(Totalpromod).toFixed(2) + `</td>
                    <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(TotalOtherDis).toFixed(2) + `</td>
                    <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(Totalcashd).toFixed(2) + `</td>
                    <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(Totalwsd).toFixed(2) + `</td>
                    <td style="width: 5%;border-left: 1px solid #808080;">`+ parseFloat(TotalTax).toFixed(2) + `</td>
                    <td style="width: 10%;border-left: 1px solid #808080;">`+ parseFloat(TotalNetPrice).toFixed(2) + `</td>
                </tr>
            </tbody>
        </table>
        <table style="width: 100%; text-align:center;border-collapse: collapse;margin-top: 2rem;">
            <thead style="border: 1px solid;">
            <tbody style="border: 1px solid;background:#b1b1b1">
                <tr>
                    <td style="width: 15%;border-left: 1px solid #808080;"> اجمالي الفاتوره  </td>

                    <td style="text-align:right;width: 60%;border-left: 1px solid #808080;">`+ InvoiceData.ArabicPrice + `</td>

                       
                    <td style="width: 25%;border-left: 1px solid #808080;">`+ InvoiceData.TotalInvoiceNet + `</td>
                    </tr>
                    </tbody>
                </table>`
        htmlfooter = TotalInfo + `
        <table style="width: 100%; text-align:center;border-collapse: collapse;">
        <thead style="border: 1px solid;background:#b1b1b1">
            <tr>
                <td style="width: 15%;border-left: 1px solid #808080;">ﺍﻟﺴﺠﻞ ﺍﻟﺘﺠﺎﺭﻯ </td>
                <td style="width: 15%;border-left: 1px solid #808080;"> ﺍﻟﺒﻄﺎﻗﺔ ﺍﻟﻀﺮﻳﺒﻴﺔ </td>
                <td style="width: 15%;border-left: 1px solid #808080;"> ﺍﻟﻤﻠﻒ ﺍﻟﻀﺮﻳﺒﻲ </td>
                <td style="width: 30%;border-left: 1px solid #808080;">ﺍلعنوان</td>
                <td style="width: 25%;border-left: 1px solid #808080;">ﺍﻟﺘﻠﻴﻔﻮﻥ </td>
            </tr>
        </thead>
        <tbody style="border: 1px solid;">
            <tr>
                                <td style="width: 15%;border-left: 1px solid #808080;">`+ tenantProfile.tenantRegFile + ` </td>
                                <td style="width: 15%;border-left: 1px solid #808080;">`+ tenantProfile.tenantTaxCard + `</td>
                                <td style="width: 15%;border-left: 1px solid #808080;">`+ tenantProfile.tenantTaxFile + `</td>
                                <td style="width: 30%;border-left: 1px solid #808080;">`+ tenantProfile.tenantAddress + `</td>
                                <td style="width: 25%;border-left: 1px solid #808080;">`+ tenantProfile.tenantMobile + `</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </body>
        
        </html>`

        html += htmlfooter

    }






    return html
};
