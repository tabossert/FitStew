<?php
//Set title
$title = "ZuneFit User Portal";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<script type="text/javascript" src="https://js.stripe.com/v1/"></script>

<!-- Header End -->

<input type="hidden" name="utoken" id="utoken" value="<?php echo $_SESSION['token']; ?>"/>
<input type="hidden" name="userid" id="userid" value="<?php echo $_SESSION['userid']; ?>"/>






<div class="middle-container">

    <div class="inner-left-part">

        <div >
            <ul id="inner-nav">
                <li id="schedule-tab" class="selected"><a  href="javascript:void(0);" onclick="widgets.user.loadLeft(0)">Schedule</a></li>
                <li id='gymsearch-tab'><a  href="javascript:void(0);"  onclick="widgets.user.loadLeft(1)">Gym Search</a></li>
                <li id="Preferences-tab"><a  href="javascript:void(0);"  onclick="widgets.user.loadLeft(2);">Preferences</a></li>
            </ul>

        </div>
        <div class="clr" ></div>

        <div class="blue-box1" style="">

            <div id="infoBox" style="min-height: 350px;padding: 5px;border: none;">
                <div style="width: 16% ;float: left; border-right: solid; border-color: #565D60;">
                    <div id="simplify" onclick="widgets.user.newSchedule();" style="cursor: pointer;height: 10px;width: auto;"><a href = "#lightboxSchedule" class="light"><img src="images/time.png" alt="" border="0" style="margin:0px 0px 17px 0px;position: relative;left: 120px;" /></a></div>
                    <div class="inner-calender1" style="clear: both; margin-top: 25px; width: 70px;"><a id="day" href="#" onclick="widgets.user.getUserDaySchedule();"><img src="images/day_cal.png" alt="" border="" style="margin:0px 0px 17px 0px; " /></a><br />
                        DAY</div>

                    <div class="inner-calender2" style="clear: both;margin-top: 25px;width: 70px;"><a id= "week" href="#" onclick="widgets.user.getUserWeekSchedule()"><img src="images/week_cal.png" alt="" border="0" style="margin:0px 0px 17px 0px;" /></a><br />
                        WEEK</div>
                    <div class="inner-calender3" style="clear: both;margin-top: 25px;width: 70px;"><a id= "month" href="#" onclick="widgets.user.getUserMonthSchedule()"><img src="images/month_cal.png" alt="" border="0" style="margin:0px 0px 17px 0px;" /></a><br />
                        MONTH</div>

                </div>

                <div class="inner-txt" style="width: 70% ;float: right; margin-left: 10px; ">

                </div>
            </div>

            <div id="searchbox" style="display: none ;min-height: 360px; font-size: 1.1em;">
                <!--                <div class="up-blue-box">-->


                <div style="clear: both;">



                    <div id="advSearch" style="padding: 6px;border: none;min-height: 340px;">
                        <form> <div >

                                <p class="underline_title">Location</p>
                                <table style="margin-left: 30px;">
                                    <tr>
                                        <td style="width: 50px;">
                                            <label for="Miles"  class="style_text">  Miles  </label></td><td>
                                            <input type="text" name="Miles" id="Miles"  class="round" placeholder="within.." style="font-style: normal;" />
                                        </td>
                                        <td style="width: 70px; text-align: center;">
                                            <label for="Within"  class="style_text">  Within  </label></td><td>
                                            <input type="text" name="Within" id="Within" placeholder="zip / city.." class="round" style="font-style: normal;"/> 

                                        </td>
                                    </tr>
                                </table>
                                <br/>
                                <p class="underline_title">Rate</p>
                                <br/>
                                <div id="slider-range-min"></div>
                                <br/>
                                <p>
                                    <input type="text" class="style_text" id="amount" name="amount" readonly style="background: none;border: none;margin-left: 30px; font-size: 0.8em;"/>
                                    <input type="text" class="style_text" id="amounts" name="amounts" readonly style="background: none;border: none;margin-left: 30px; font-size: 0.8em;display: none;"/>

                                </p>
                                <br/>
                                <span class="underline_title" >Keyword</span>
                                <input type="text" name="keyword" id="keyword" placeholder="karate, kickboxing, yoga etc..." class="round" style="margin-left: 30px;font-style: normal;width: 200px;" />
                                <div style="float: right;">
                                    <div class="buttons" id="searching" onclick="widgets.user.advancedSearch();" >Search</div>
                                </div>
                                <input type="reset" class="buttons" style="float: right;margin-right: 10px;" onclick="$('#advSearch-result').html('');"/>
                            </div></form>
                        <br/>
                        <div class="clr" style="border-bottom: 2px solid; border-bottom-color: #184A61;"></div>
                        <div id="advSearch-result">
                        </div>
                    </div>
                </div>
            </div>

            <div id="preferences" style="display: none ;height: 480px; ">
                <div class="second-nav nav3" style="background-color: #8b8b8b;" onclick="widgets.user.preferencesBilling(0)">Preferences</div><div class="second-nav nav4" onclick="widgets.user.preferencesBilling(1)">Billing</div>

                <div style="clear: both;">
                    <div id="preference" class="blue-boxs">
                        <span id="edit" style="float: right;cursor: pointer;"><img src="images/edits.png" onclick="widgets.user.edit()" /></span>
                        <span id="done" style="float: right;cursor: pointer;display: none;" ><img src="images/dones.png" onclick="widgets.user.update()" /></span>


                        <table class="pref">
                            <tr><td>
                                    <label for="pref_email" class="email" >  Email  </label></td><td>:</td><td>
                                    <input type="text" name="pref_email" id="pref_email" class="transparent" style=" width: 400px;" readonly="readonly" />
                                    <label for="pref_email" class="error" generated="true"></label></td></tr> 
                            <tr><td>
                                    <label for="pref_firstName" class="firstName" >  First&nbsp;Name  </label></td><td>:</td><td>
                                    <input type="text" name="pref_firstName" id="pref_firstName" class="transparent" style=" width: 400px;" readonly="readonly"/>
                                    <label for="pref_firstName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_lastName" class="lastName" >  Last&nbsp;Name  </label></td><td>:</td><td>
                                    <input type="text" name="pref_lastName" id="pref_lastName" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                                    <label for="pref_lastName" class="error" generated="true"></label></td></tr>


                            <tr><td>
                                    <label for="pref_address" class="address" > Address-1  </label></td><td>:</td><td>
                                    <input type="text" name="pref_address" id="pref_address" class="transparent" style=" width: 400px;" readonly="readonly" /> 
                                    <label for="pref_address" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_address2" class="address2" > Address-2  </label></td><td>:</td><td>
                                    <input type="text" name="pref_address2" id="pref_address2" class="transparent" style=" width: 400px;" readonly="readonly" /> 
                                    <label for="pref_address2" class="error" generated="true"></label></td></tr>

                            <tr><td>
                                    <label for="pref_city"  > City  </label></td><td>:</td><td>
                                    <input type="text" name="pref_city" id="pref_city" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                                    <label for="pref_city" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_state"  > State  </label></td><td>:</td><td>
                                    <select name="pref_state" id="pref_state"  style=" width: 410px;" class="transparent" disabled="" >
                                        <option value="" style="background-color:black ; color: wheat;font-weight: bold;">Canada Provinces..</option>
                                        <option value="AB">Alberta</option>
                                        <option value="BC">British Columbia</option>
                                        <option value="MB">Manitoba</option>
                                        <option value="NB">New Brunswick</option>
                                        <option value="NL">Newfoundland and Labrador</option>
                                        <option value="NS">Nova Scotia</option>
                                        <option value="ON">Ontario</option>
                                        <option value="PE">Prince Edward Island</option>
                                        <option value="QC">Quebec</option>
                                        <option value="SK">Saskatchewan</option>
                                        <option value="NT">Northwest Territories</option>
                                        <option value="NU">Nunavut</option>
                                        <option value="YT">Yukon</option>


                                        <option value="" style="background-color:black ; color: wheat;font-weight: bold;">US States..</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>

                                    </select>
                                    <!--<input type="text" name="pref_state" id="pref_state" class="transparent" style=" width: 400px;" readonly="readonly"/>--> 
                                    <label for="pref_state" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_zip"  > Zip Code  </label></td><td>:</td><td>
                                    <input type="text" name="pref_zip" id="pref_zip" class="transparent" maxlength="5" style=" width: 400px;" readonly="readonly"/> 
                                    <label for="pref_zip" class="error" generated="true"></label></td></tr>
                        </table>
                        <hr/>
                        <span id="phone_edit" style="float: right;cursor: pointer;"><img src="images/edits.png" onclick="widgets.user.phone_edit()" /></span>
                        <span id="phone_done" style="float: right;cursor: pointer;display: none;" ><img src="images/dones.png" onclick="widgets.user.phone_update()" /></span>

                        <table class="pref">
                            <tr><td>
                                    <label for="pref_phone"  > Phone&nbsp;number  </label></td><td>:</td><td>
                                    <input type="text" name="pref_phone" id="pref_phone" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                                    <label for="pref_phone" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_pin"  > Pin Code  </label></td><td>:</td><td>
                                    <input type="password" name="pref_pin" id="pref_pin" class="transparent" maxlength="4" style=" width: 400px;" readonly="readonly"/> 
                                    <label for="pref_pin" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_pin2"  > Verify code </label></td><td>:</td><td>
                                    <input type="password" name="pref_pin2" id="pref_pin2" class="transparent" maxlength="4" style=" width: 400px;" readonly="readonly"/> 
                                </td></tr>
                        </table>
                        <label id="pref_error" style="color: darkred;" />

                    </div>
                    <div id="billing" class="blue-boxs" style="display: none;" >
                        <div >

                            <input type="checkbox" id="pref_det" onclick="widgets.user.pref_det()"/>
                            <label for="pref_det"  > Fill details from preferences  </label>
                            <form action="" method="POST" id="payment-form">
                                <fieldset>

                                    <input name="redirect_url" type="hidden" value="" />
                                    <input id="pk" type="hidden" value="<?php echo PK; ?>" />    

                                    <input name="custom" type="hidden" value="Any value you want us to save with this payment method" />



                                    <table style="border-collapse: separate;border-spacing: 0px 10px; width: 280px;float: left;clear: left;">
                                        <tr style="padding-bottom: 5px;"><td>
                                                <label for="first_name" class="bil_label">Name</label></td><td>
                                                <input id="first_name" name="first_name" type="text" class="bil_text"/></td>
                                        </tr>

                                        <tr><td>
                                                <label for="address_1" class="bil_label">Address 1</label></td><td>
                                                <input id="address_1" name="address_1" type="text"  class="bil_text"/></td>
                                        </tr>
                                        <tr><td>
                                                <label for="address_2" class="bil_label">Address 2</label></td><td>
                                                <input id="address_2" name="address_2" type="text"  class="bil_text"/></td>
                                        </tr>
                                        <tr><td>
                                                <label for="city" class="bil_label">City</label></td><td>
                                                <input id="city" name="city" type="text"  class="bil_text"/>
                                            </td></tr>

                                        <tr><td>
                                                <label for="state" class="bil_label">State</label></td><td>
                                                <select id="state" name="state" class="bil_text" style="width:140px;padding: 5px; ">
                                                    <option value="" style="background-color:black ; color: wheat;font-weight: bold;">Canada Provinces..</option>
                                                    <option value="AB">Alberta</option>
                                                    <option value="BC">British Columbia</option>
                                                    <option value="MB">Manitoba</option>
                                                    <option value="NB">New Brunswick</option>
                                                    <option value="NL">Newfoundland and Labrador</option>
                                                    <option value="NS">Nova Scotia</option>
                                                    <option value="ON">Ontario</option>
                                                    <option value="PE">Prince Edward Island</option>
                                                    <option value="QC">Quebec</option>
                                                    <option value="SK">Saskatchewan</option>
                                                    <option value="NT">Northwest Territories</option>
                                                    <option value="NU">Nunavut</option>
                                                    <option value="YT">Yukon</option>


                                                    <option value="" style="background-color:black ; color: wheat;font-weight: bold;">US States..</option>
                                                    <option value="AL">Alabama</option>
                                                    <option value="AK">Alaska</option>
                                                    <option value="AZ">Arizona</option>
                                                    <option value="AR">Arkansas</option>
                                                    <option value="CA">California</option>
                                                    <option value="CO">Colorado</option>
                                                    <option value="CT">Connecticut</option>
                                                    <option value="DE">Delaware</option>
                                                    <option value="DC">District of Columbia</option>
                                                    <option value="FL">Florida</option>
                                                    <option value="GA">Georgia</option>
                                                    <option value="HI">Hawaii</option>
                                                    <option value="ID">Idaho</option>
                                                    <option value="IL">Illinois</option>
                                                    <option value="IN">Indiana</option>
                                                    <option value="IA">Iowa</option>
                                                    <option value="KS">Kansas</option>
                                                    <option value="KY">Kentucky</option>
                                                    <option value="LA">Louisiana</option>
                                                    <option value="ME">Maine</option>
                                                    <option value="MD">Maryland</option>
                                                    <option value="MA">Massachusetts</option>
                                                    <option value="MI">Michigan</option>
                                                    <option value="MN">Minnesota</option>
                                                    <option value="MS">Mississippi</option>
                                                    <option value="MO">Missouri</option>
                                                    <option value="MT">Montana</option>
                                                    <option value="NE">Nebraska</option>
                                                    <option value="NV">Nevada</option>
                                                    <option value="NH">New Hampshire</option>
                                                    <option value="NJ">New Jersey</option>
                                                    <option value="NM">New Mexico</option>
                                                    <option value="NY">New York</option>
                                                    <option value="NC">North Carolina</option>
                                                    <option value="ND">North Dakota</option>
                                                    <option value="OH">Ohio</option>
                                                    <option value="OK">Oklahoma</option>
                                                    <option value="OR">Oregon</option>
                                                    <option value="PA">Pennsylvania</option>
                                                    <option value="RI">Rhode Island</option>
                                                    <option value="SC">South Carolina</option>
                                                    <option value="SD">South Dakota</option>
                                                    <option value="TN">Tennessee</option>
                                                    <option value="TX">Texas</option>
                                                    <option value="UT">Utah</option>
                                                    <option value="VT">Vermont</option>
                                                    <option value="VA">Virginia</option>
                                                    <option value="WA">Washington</option>
                                                    <option value="WV">West Virginia</option>
                                                    <option value="WI">Wisconsin</option>
                                                    <option value="WY">Wyoming</option>

                                                </select>
                                            </td></tr>
                                        <tr><td>
                                                <label for="zip" class="bil_label">Zip</label></td><td>
                                                <input id="zip" name="zip" type="text"  class="bil_text" maxlength="5" pattern=".{3,}"/>
                                                <label for="zip" class="error" generated="true"></label>   </td></tr>
                                    </table>

                                    <div class="less"><span style="float: left;width: 175px;">Refill automatically</span>
                                        <span id="edit_fil" onclick="widgets.user.creditInfo();" class="common">Edit</span>
                                        <span id="done_fil" onclick="widgets.user.update_refill();" class="common" style="display: none;width: 110px;">Finished editing</span>
                                    </div>

                                    <div id="hide_refil">
                                        <table style="border-collapse: separate;border-spacing: 0px 10px; width: 235px;float: left;clear: left;">
                                            <tr style="padding-bottom: 5px;"><td>
                                                    <input id="refil" name="refil" type="checkbox" disabled=""/>
                                                    <label for="refil">Refil Automatically</label></td>
                                            </tr>
                                            <tr><td>
                                                    <label for="when" style="float: left;">When amount less than:&nbsp;</label>
                                                    <input type="text" id="when" disabled="" class="round" style="text-align: right;float: right;"/>
                                                </td>
                                            </tr>
                                            <tr><td>
                                                    <label for="auto_amount">Amount&nbsp;&nbsp;:</label>
                                                    <input type="text" id="auto_amount" placeholder="Refill amount" class="round" style="text-align: right;float: right;" disabled=""/>
                                                </td>
                                            </tr>

                                        </table>
                                    </div>

                                    <table style="border-collapse: separate;border-spacing: 0px 10px; width: 310px;"><tr><td>
                                                <label for="card_number" class="bil_label">Card Number</label></td><td>
                                                <input  size="20" autocomplete="off" class="card-number bil_text" type="text" /></td></tr>
                                        <tr><td>
                                                <label for="cvv" class="bil_label">Security Code</label></td><td>
                                                <input  type="text"  maxlength="4" autocomplete="off" class="card-cvc bil_text"/></td></tr>
                                        <tr> <td>
                                                <label for="credit_card_month" class="bil_label">Expires on month</label></td><td >
                                                <input maxlength="2" class="card-expiry-month bil_text"  type="text" placeholder="05" /></td></tr >
                                        <tr><td>    <label for="credit_card_year" class="bil_label">Expires on year</label></td><td >   
                                                <input  maxlength="4" class="card-expiry-year bil_text"  type="text" placeholder="2012" /></td></tr>
                                        <tr> <td>
                                                <label for="amount" class="bil_label">Amount</label></td><td>
                                                <input id="pay_amount" name="pay_amount" type="text"  class="bil_text"/></td></tr>

                                    </table>

                                    <div>
                                        <img src="images/CreditCardLogos.jpg" style="clear: right;  padding-left: 110px; "/>

                                        <button class="buttons submit-button" type='button' style="clear: right; margin-top: 10px;margin-bottom: 10px;margin-left: 105px;" onclick="widgets.user.onload(widgets.user.pay_me);">Submit Payment</button>
                                        <div id="message" class="payment-errors" style="display: none;">Message</div>
                                    </div>
                                </fieldset>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <!--</div>-->

    <div class="right-box">
        <div class="balance-box" id="balanceBox">
        </div>
        <div class="right-featured-box">
            <h1>Featured Gyms</h1>
            <div id="featuredGymsBox">
            </div>
        </div>
        <div style="height:20px;"></div>
        <div class="right-featured-box" >
            <h1>Popular Workouts</h1>
            <ul class="user-item-link">


            </ul>
        </div>



    </div>
    <div style="display: none;">

        <div name="lightbox" id="lightbox" class="blue-box2" style="height: 450px; width: 400px; ">
            <div style="height: 60px;">
                <div id="suc_err" style="float: right;display: inline;"></div>
                <div class="tweet" style="display: inline;"></div>
                <div class="like" style="display: inline;"></div>
                <div class="plus" ></div>
            </div>
            <div id="box-header" >

                <div id="g_image" style="float: left;width: 70px;"></div>
                <div style="width: 170px;float: left;">
                    <table class="pref2">
                        <tr><td>
                                <label for="g_name" class="labels"> Gym&nbsp;Name  </label> 
                            </td><td><td>:<td>
                                <input type="text" name="g_name" id="g_name" class="transparent"/>
                            </td>  </tr>  
                        <tr> <td>
                                <label for="g_rate" class="labels"> Rate  </label>
                            </td> <td><td>:<td>
                                <input type="text" name="g_rate" id="g_rate" class="transparent"/>
                            </td>  
                        </tr>
                    </table></div>
            </div>
            <div>
                <div class = "my-box2" >
                    <p>
                    <ul class = "toplink">
                        <li><a href = "#" onclick="widgets.user.loadBox(0)">Description</a></li>
                        <li><a href = "#" onclick="widgets.user.loadBox(1)">Schedule</a></li>

                        <li><a href = "#" onclick="widgets.user.loadBox(2)">Services</a></li>
                    </ul>
                    </p>
                </div>



                <div id="divexample1" style="height: 290px;float: left;width: 390px;overflow-x: hidden;">

                    <div id="box-description" >
                        <table class="pref">

                            <tr><td>
                                    <label for="g_address"  >  Address  </label></td><td>:</td><td>
                                    <input type="text" name="g_address" id="g_address" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_city"  >  City  </label></td><td>:</td><td>
                                    <input type="text" name="g_city" id="g_city" class="transparent"/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_state"  > State  </label></td><td>:</td><td>
                                    <input type="text" name="g_state" id="g_state" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_zipcode" > Zip&nbsp;Code  </label></td><td>:</td><td>
                                    <input type="number" name="g_zipcode" id="g_zipcode" class="transparent"/>
                                </td></tr>
                            <tr><td>
                                    <label for="g_phone"  >  Phone  </label></td><td>:</td><td>
                                    <input type="text" name="g_phone" id="g_phone" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_email"  >  email  </label></td><td>:</td><td>
                                    <input type="email" name="g_email" id="g_email" class="transparent"/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_contact"  > Contact  </label></td><td>:</td><td>
                                    <input type="text" name="g_contact" id="g_contact" class="transparent"/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_url"  > Web site  </label></td><td>:</td><td>
                                    <span type="text" name="g_url" id="g_url" class="transparent"></span> 
                                </td></tr>

                        </table>
                    </div>   
                    <div id="box-Schedule" style="display: none; " >

                    </div>   

                    <div id="box-Services" style="display: none;" >

                    </div>   
                </div>

            </div>

        </div>

    </div>

</div>
<?php include 'userProfile.php'; ?>
<?php include 'dialogs.php'; ?>
<div class="clr"></div>
<!-- Footer Start -->
<?php include 'html/footer.php'; ?>
<!-- Footer End -->
</body>
</html>
