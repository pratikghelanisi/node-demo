 const { response } = require('express');
 var nodemailer = require('nodemailer');
 const Joi = require('joi');
 const Connection = require('.././Database/connection');
 const Email = require('../Database/schema/Emailschema');
const subscribe = async (req, res) => {
    try{
        const DB_Connection = await Connection(); 
        if(DB_Connection == 1){
            const email = req.body.email;
            const schema = Joi.object({
                email: Joi.string().email().required(),
            })       
           const error = schema.validate(req.body);
           if(error.error){
            res.json({
                status: 500,
                message: "Invalid email address"
            })
           }
           else{
            const exist = await Email.findOne({email:email});
            // console.log(exist);
            if(exist == null){
                const Insertemail = await Email.insertMany({
                    email : email,
                    createdAt : Date.now()
                });
                const response = {
                    stauts: 200,
                    message : "Subscribe successfully"
                }
                res.json(response);

                  var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: 'pratikghelani86@gmail.com',
                  pass: 'iefmmdxzglxzqgpr'
                }
              });
              
              var mailOptions = {
                from: 'pratikghelani86@gmail.com',
                to: email,
                subject: 'Successfully subscribed',
                html: `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed;background-color:#f9f9f9" id="bodyTable">
                <tbody><tr><td style="padding-right:10px;padding-left:10px;" align="center" valign="top" id="bodyCell">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperWebview" style="max-width:600px">
                                <tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tbody> <tr><td style="padding-top: 20px; padding-bottom: 20px; padding-right: 0px;" align="right" valign="middle" class="webview"></td></tr></tbody></table></td> </tr> </tbody></table><table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperBody" style="max-width:600px">
                                <tbody><tr><td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableCard" style="background-color:#fff;border-color:#e5e5e5;border-style:solid;border-width:0 1px 1px 1px;">
                                                <tbody><tr><td style="background-color:#00d2f4;font-size:1px;line-height:3px" class="topBorder" height="3">&nbsp;</td>
                                                    </tr><tr class="margin-top:20px>
                                                        <td style="padding-bottom: 5px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="mainTitle">
                                                            <h2 class="text" style="color:#000;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:28px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:36px;text-transform:none;text-align:center;padding:0;margin:0">`+email+`</h2>
                                                        </td></tr><tr>
                                                        <td style="padding-bottom: 30px; padding-left: 20px; padding-right: 20px;" align="center" valign="top" class="subTitle">
                                                            <h4 class="text" style="color:#999;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;font-weight:500;font-style:normal;letter-spacing:normal;line-height:24px;text-transform:none;text-align:center;padding:0;margin:0"> Thank you for Subscription </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding-left:20px;padding-right:20px" align="center" valign="top" class="containtTable ui-sortable">
                                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="tableDescription" style="">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="padding-bottom: 20px;" align="center" valign="top" class="description">
                                                                            
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="20">&nbsp;</td>
                                                    </tr>
                                                   
                                                </tbody>
                                            </table>
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="space">
                                                <tbody>
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="wrapperFooter" style="max-width:600px">
                                <tbody>
                                    <tr>
                                        <td align="center" valign="top">
                                            <table border="0" cellpadding="0" cellspacing="0" width="100%" class="footer">
                                                <tbody>
                                                   
                                                    <tr>
                                                        <td style="padding: 10px 10px 5px;" align="center" valign="top" class="brandInfo">
                                    
                                                        </td>
                                                    </tr>
                                                
                                                    
                                                 
                                                    <tr>
                                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="font-size:1px;line-height:1px" height="30">&nbsp;</td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>`
              };
              
              transporter.sendMail(mailOptions);
            }
            else{
                const response = {
                    stauts: 200,
                    message : "Email already in exist"
                }
                res.json(response);
            }
           }
        }
        else{
            const response = {
                stauts: 502,
                message: "Database connection error"    
            }
            res.json(response);
        }
    }
    catch(error){
        res.json({
            status: 500,
            message: "error"
        })
    }
 }
module.exports = { subscribe };