<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<!-- Header End -->

<input type="hidden" name="token" id="token" value="<?php echo $_SESSION['token']; ?>"/>
<input type="hidden" name="gid" id="gid" value="<?php echo $_SESSION['gid']; ?>" />
<input type="hidden" name="gname" id="gname" value="<?php echo $_SESSION['gname']; ?>"/>
<div class="middle-container">
    <div class="inner-left-part">

        <div >
            <ul id="inner-nav" style="padding-left: 14px;">
                <li><a href = "#lightbox" class="light" >Profile</a></li>
                <li><a href="owner.php" class="selected">Schedule</a></li>
                <li><a href="ownerServices.php" >Services</a></li>
                <li><a href="ownerAnalytics.php" >Analytics</a></li>
                <li><a href="ownerProfile.php" >Preferences</a></li>

            </ul>

        </div>
        <form action="encript.php" method="post"
              enctype="multipart/form-data">
            <label for="file">Filename:</label>
            <input type="file" name="file" id="file"><br>
            <input type="hidden" name="gid" id="gid" value="<?php echo $_SESSION['gid']; ?>" />
            <input type="submit" name="submit" value="Submit">
        </form>
        <div class="clr" ></div>
        <div class="blue-box1">
            <div id="shedule" style="min-height: 360px;">
                <div style="width: 10.5% ;float: left; border-right: solid; border-color: #565D60;">
                    <div class="inner-calender1" style="clear: both; margin-top: 25px; "><a id="day" href="#" onclick="widgets.gim.getGymDaySchedule();"><img src="images/day.png" alt="" border="" style="margin:0px 0px 7px 0px;" /></a><br />
                        DAY</div>

                    <div class="inner-calender2" style="clear: both;margin-top: 25px;"><a id= "week" href="#" onclick="widgets.gim.getGymWeekSchedule()"><img src="images/week.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        WEEK</div>
                    <div class="inner-calender3" style="clear: both;margin-top: 25px;"><a id= "month" href="#" onclick="widgets.gim.getGymMonthSchedule()"><img src="images/month.png" alt="" border="0" style="margin:0px 0px 7px 0px;" /></a><br />
                        MONTH</div>

                </div>

                <div class="inner-txt" style="width: 70% ;float: right; margin-left: 10px;">

                </div>
            </div>
        </div>

    </div>
    <div style="display: none;">

        <div name="lightbox" id="lightbox" class="blue-box2" style="height: 400px; width: 400px; ">


            <div id="box-header" >
                <table class="pref2">
                    <tr><td>
                            <label for="g_name" class="labels"> Gym&nbsp;Name  </label> 
                        </td><td><td>:<td>
                            <input type="text" name="g_name" id="g_name" class="transparent" readonly=""/>
                        </td>  </tr>  
                    <tr> <td>
                            <label for="g_rate" class="labels"> Rate  </label>
                        </td> <td><td>:<td>
                            <input type="text" name="g_rate" id="g_rate" class="transparent" readonly=""/>
                        </td>  
                    </tr>
                </table>
            </div>
            <div>
                <div class = "my-box2" >
                    <p>
                    <ul class = "toplink">
                        <li><a href = "#" onclick="widgets.gim.loadBox(0)">Description</a></li>
                        <li><a href = "#" onclick="widgets.gim.loadBox(1)">Schedule</a></li>

                        <li><a href = "#" onclick="widgets.gim.loadBox(2)">Services</a></li>
                    </ul>
                    </p>
                </div>



                <div id="divexample1" style="height: 290px;float: left;width: 390px;overflow-x: hidden;">

                    <div id="box-description" >
                        <span id="g_edit" style="float: right;cursor: pointer;"><img src="images/edits.png" onclick="widgets.gim.edit()" /></span>
                        <span id="g_done" style="float: right;cursor: pointer;display: none;" ><img src="images/dones.png" onclick="widgets.gim.update()" /></span>

                        <table class="pref">

                            <tr><td>
                                    <label for="g_address"  >  Address  </label></td><td>:</td><td>
                                    <input type="text" name="g_address" id="g_address" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_city"  >  City  </label></td><td>:</td><td>
                                    <input type="text" name="g_city" id="g_city" class="transparent" readonly=""/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_state"  > State  </label></td><td>:</td><td>
                                    <input type="text" name="g_state" id="g_state" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_zip" > Zip&nbsp;Code  </label></td><td>:</td><td>
                                    <input type="number" name="g_zip" id="g_zip" class="transparent" readonly=""/>
                                </td></tr>
                            <tr><td>
                                    <label for="g_phone"  >  Phone  </label></td><td>:</td><td>
                                    <input type="text" name="g_phone" id="g_phone" class="transparent" readonly=""/ > 
                                </td></tr>
                            <tr><td>
                                    <label for="g_email"  >  email  </label></td><td>:</td><td>
                                    <input type="email" name="g_email" id="g_email" class="transparent" readonly=""/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_contact"  > Contact  </label></td><td>:</td><td>
                                    <input type="text" name="g_contact" id="g_contact" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_fb"  > Facebook  </label></td><td>:</td><td>
                                    <input type="text" name="g_fb" id="g_fb" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_twt"  > Twitter  </label></td><td>:</td><td>
                                    <input type="text" name="g_twt" id="g_twt" class="transparent" readonly=""/> 
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
    <!--    <div class="tabs">
            <ul class="tabs-link">
                <li><a href = "javascript:void(0)" onclick = "$('#light, #fade').css('display','block');">Profile</a></li>
                <li><a href="ownerServices.php" >Services</a></li>
                <li><a href="ownerAnalytics.php" >Analytics</a></li>
                <li><a href="#" >Preferences</a></li>
            </ul>
        </div>-->

    <div class="right-box">
        <div class="balance"></div>
        <div class="right-featured-box" id="owner-right-featured-box">
            <h1>Quick State</h1>
            <ul class="item-link">                
            </ul>
        </div>
    </div>

</div>
<div class="clr"></div>
<!-- Footer Start -->
<?php include 'html/footer.php'; ?>
<!-- Footer End -->
</body>
</html>
