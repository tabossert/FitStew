<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>


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

            <div id="infoBox" style="min-height: 310px;padding: 5px;border: none;">
                <div style="width: 10.5% ;float: left; border-right: solid; border-color: #565D60;">
                    <div class="inner-calender1" style="clear: both; margin-top: 25px; "><a id="day" href="#" onclick="widgets.user.getUserDaySchedule();"><img src="images/day.png" alt="" border="" style="margin:0px 0px 7px 0px;" /></a><br />
                        DAY</div>

                    <div class="inner-calender2" style="clear: both;margin-top: 25px;"><a id= "week" href="#" onclick="widgets.user.getUserWeekSchedule()"><img src="images/week.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        WEEK</div>
                    <div class="inner-calender3" style="clear: both;margin-top: 25px;"><a id= "month" href="#" onclick="widgets.user.getUserMonthSchedule()"><img src="images/month.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        MONTH</div>

                </div>

                <div class="inner-txt" style="width: 70% ;float: right; margin-left: 10px; ">

                </div>


            </div>

            <div id="searchbox" style="display: none ;min-height: 360px; font-size: 1.1em;">
                <!--                <div class="up-blue-box">-->
                <div class="second-nav nav1" style="background-color: #8b8b8b;" onclick="widgets.user.search(0)">Search</div><div  class="second-nav nav2" onclick="widgets.user.search(1)">Advanced Search</div>

                <div style="clear: both;">

                    <div id="search" class="blue-boxs" style="min-height: 310px;padding: 5px;border: none;">
                        <br/><br/>
                        <div >
                            <div>
                                <label  style="float: left;width: 110px;">Search By</label>

                                <select name="searchBy" class="searchBy" style="float: left;" onclick="alert('asda');">
                                    <option value="name">Gym Name</option>
                                    <option value="name">Gym Name</option>
                                    <option value="city">City</option>
                                    <option value="zipcode">Zip Code</option>
                                </select></div><br/><br/>

                            <div >



                                <label  style="clear:both;float: left;width: 110px;">State</label>
                                <input id="project" />
                                <input type="hidden" id="project-id" />
                            </div>

                            <br/><br/>
                            <form class="searchform" >
                                <input class="searchfield" type="text" name='searchkey' id='searchkey' placeholder="karate, kickboxing, yoga etc..." style="color: black;" onchange="widgets.user.searchMe()" />
                                <input  type="text" style="display: none;" />
                                <input class="searchbutton" type="button" value="Go" onclick="widgets.user.searchMe()"/>


                            </form>  
                        </div>
                        <br/>
                        <div class="clr" style="border-bottom: 2px solid; border-bottom-color: #184A61;"></div>
                        <br/>
                        <div id="search-result" style="text-align: center;">

                        </div>
                    </div>

                    <div id="advSearch" class="blue-boxs" style="display: none;padding: 6px;border: none;min-height: 340px;">
                        <form> <div >
<!--                                <p class="underline_title">Type</p>
                                <table style="margin-left: 30px;">
                                    <tr id="search-service">


                                    </tr>
                                </table>
                                <br/>-->
                                <p class="underline_title">Location</p>
                                <table style="margin-left: 30px;">
                                    <tr>
                                        <td style="width: 50px;">
                                            <label for="Miles"  class="style_text">  Miles  </label></td><td>
                                            <input type="text" name="Miles" id="Miles"  class="round" placeholder="within.." style="font-style: normal;" onchange="widgets.user.advancedSearch()"/>
                                        </td>
                                        <td style="width: 70px; text-align: center;">
                                            <label for="Within"  class="style_text">  Within  </label></td><td>
                                            <input type="text" name="Within" id="Within" placeholder="zip / city.." class="round" style="font-style: normal;" onchange="widgets.user.advancedSearch()"/> 

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

                                </p>
                                <br/>
                                <span class="underline_title" >Keyword</span>
                                <input type="text" name="keyword" id="keyword" placeholder="karate, kickboxing, yoga etc..." class="round" style="margin-left: 30px;font-style: normal;width: 200px;" onchange="widgets.user.advancedSearch()"/>
                                <div style="float: right;">
                                    <div class="buttons" onclick="widgets.user.advancedSearch();" >Search</div>
                                </div>
                                <input type="reset" class="buttons" style="float: right;margin-right: 10px;"/>
                            </div></form>
                        <br/>
                        <div class="clr" style="border-bottom: 2px solid; border-bottom-color: #184A61;"></div>
                        <div id="advSearch-result">
                        </div>
                    </div>
                </div>
            </div>

            <div id="preferences" style="display: none ;min-height: 360px; ">
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
                                    <input type="text" name="pref_firstName" id="pref_firstName" class="transparent" style=" width: 400px;"/>
                                    <label for="pref_firstName" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_lastName" class="lastName" >  Last&nbsp;Name  </label></td><td>:</td><td>
                                    <input type="text" name="pref_lastName" id="pref_lastName" class="transparent" style=" width: 400px;"/> 
                                    <label for="pref_lastName" class="error" generated="true"></label></td></tr>


                            <tr><td>
                                    <label for="pref_address" class="address" > Address  </label></td><td>:</td><td>
                                    <input type="text" name="pref_address" id="pref_address" class="transparent" style=" width: 400px;" /> 
                                    <label for="pref_address" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_city"  > City  </label></td><td>:</td><td>
                                    <input type="text" name="pref_city" id="pref_city" class="transparent" style=" width: 400px;"/> 
                                    <label for="pref_city" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_state"  > State  </label></td><td>:</td><td>
                                    <input type="text" name="pref_state" id="pref_state" class="transparent" style=" width: 400px;"/> 
                                    <label for="pref_state" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_zip"  > Zip Code  </label></td><td>:</td><td>
                                    <input type="text" name="pref_zip" id="pref_zip" class="transparent" style=" width: 400px;"/> 
                                    <label for="pref_zip" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_phone"  > Phone&nbsp;number  </label></td><td>:</td><td>
                                    <input type="text" name="pref_phone" id="pref_phone" class="transparent" style=" width: 400px;"/> 
                                    <label for="pref_phone" class="error" generated="true"></label></td></tr>
                            <tr><td>
                                    <label for="pref_pin"  > Pin Code  </label></td><td>:</td><td>
                                    <input type="text" name="pref_pin" id="pref_pin" class="transparent" style=" width: 400px;"/> 
                                    <label for="pref_pin" class="error" generated="true"></label></td></tr>


                        </table>


                    </div>
                    <div id="billing" class="blue-boxs" style="display: none;">
                        <div >
                            <form action="" method="POST">
                                <fieldset>

                                    <input name="redirect_url" type="hidden" value="" />
                                    <input name="merchant_key" type="hidden" value="dbb9284e8820d495f3833e50" />


                                    <input name="custom" type="hidden" value="Any value you want us to save with this payment method" />



                                    <table style="border-collapse: separate;border-spacing: 0px 10px; width: 280px;float: left;clear: left;">
                                        <tr style="padding-bottom: 5px;"><td>
                                                <label for="first_name" class="bil_label">First name</label></td><td>
                                                <input id="first_name" name="first_name" type="text" class="bil_text"/></td>
                                        </tr>
                                        <tr><td>
                                                <label for="last_name" class="bil_label">Last name</label></td><td>
                                                <input id="last_name" name="last_name" type="text" class="bil_text"/></td>
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
                                                <input id="city" name="city" type="text"  class="bil_text"/></td></tr>

                                        <tr><td><label for="state" class="bil_label">State</label></td><td>
                                                <input id="state" name="state" type="text"  class="bil_text"/></td></tr>
                                        <tr><td>
                                                <label for="zip" class="bil_label">Zip</label></td><td>
                                                <input id="zip" name="zip" type="text"  class="bil_text"/></td></tr>


                                    </table>

                                    <div class="less"><span style="float: left;width: 175px;">Refill automatically</span>
                                        <span id="edit_fil" onclick="widgets.user.creditInfo();" class="common">Edit</span>
                                        <span id="done_fil" onclick="widgets.user.update_refill();" class="common" style="display: none;width: 110px;">Finished editing</span>
                                    </div>

                                    <div id="hide_refil" style="display: none;">
                                        <table style="border-collapse: separate;border-spacing: 0px 10px; width: 280px;float: left;clear: left;">
                                            <tr style="padding-bottom: 5px;"><td>
                                                    <input id="refil" name="refil" type="checkbox" />
                                                    <label for="refil">Refil Automatically</label></td>
                                            </tr>
                                            <tr><td>
                                                    <select id="when">
                                                        <option value="0">When to Refill</option>
                                                        <option value="1">1st of month</option>
                                                        <option value="15">15th of month</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr><td>
                                                    <input type="text" id="auto_amount" placeholder="Refill amount" class="round" style="text-align: right;"/>
                                                </td>
                                            </tr>


                                        </table>
                                    </div>

                                    <table style="border-collapse: separate;border-spacing: 0px 10px; width: 310px;"><tr><td>
                                                <label for="card_number" class="bil_label">Card Number</label></td><td>
                                                <input id="card_number" name="card_number" type="text"  class="bil_text"/></td></tr>
                                        <tr><td>
                                                <label for="cvv" class="bil_label">Security Code</label></td><td>
                                                <input id="cvv" name="cvv" type="text"  class="bil_text"/></td></tr>
                                        <tr> <td>
                                                <label for="credit_card_month" class="bil_label">Expires on month</label></td><td >
                                                <input id="expiry_month" class="bil_text" name="expiry_month" type="text" placeholder="05" /></td></tr >
                                        <tr><td>    <label for="credit_card_year" class="bil_label">Expires on year</label></td><td >   
                                                <input id="expiry_year" class="bil_text" name="expiry_year" type="text" placeholder="2012" width="4" /></td></tr>
                                        <tr> <td>
                                                <label for="amount" class="bil_label">Amount</label></td><td>
                                                <input id="amount" name="amount" type="text"  class="bil_text"/></td></tr>

                                    </table>
                                    <div>
                                        <img src="images/CreditCardLogos.jpg" style="clear: right;  padding-left: 110px; "/>

                                        <button class="buttons" type='button' style="clear: right; margin-top: 10px;margin-left: 130px;" onclick="widgets.user.payment();">Submit Payment</button>
                                        <div id="message">Message</div>
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

        <div name="lightbox" id="lightbox" class="blue-box2" style="height: 400px; width: 400px; ">
            
            <div class="fb-like" data-href="https://www.facebook.com/zunefit" data-send="false" data-width="400" data-show-faces="false"></div>

            <div id="box-header" >
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
                </table>
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
<div class="clr"></div>
<!-- Footer Start -->
<?php include 'html/footer.php'; ?>
<!-- Footer End -->
</body>
</html>
