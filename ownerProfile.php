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
                <li><a href="owner.php" >Schedule</a></li>
                <li><a href="ownerServices.php" >Services</a></li>
                <li><a href="ownerAnalytics.php" >Analytics</a></li>
                <li><a href="ownerProfile.php" class="selected">Preferences</a></li>
            </ul>

        </div>
        <div class="clr" ></div>
        <div class="blue-box1">
            <div id="shedule" style="min-height: 360px;">
               
                <span class="underline_title" >Billing address</span>
                <table class="pref">
                    <tr><td>
                            <label for="pref_name" class="name" >  Gym&nbsp;Name  </label></td><td>:</td><td>
                            <input type="text" name="pref_name" id="pref_name" class="transparent" style=" width: 400px;" readonly="readonly"/>
                            <label for="pref_name" class="error" generated="true"></label></td></tr>



                    <tr><td>
                            <label for="pref_address" class="address" > Address  </label></td><td>:</td><td>
                            <input type="text" name="pref_address" id="pref_address" class="transparent" style=" width: 400px;"  readonly="readonly"/> 
                            <label for="pref_address" class="error" generated="true"></label></td></tr>
                    <tr><td>
                            <label for="pref_city"  > City  </label></td><td>:</td><td>
                            <input type="text" name="pref_city" id="pref_city" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                            <label for="pref_city" class="error" generated="true"></label></td></tr>
                    <tr><td>
                            <label for="pref_state"  > State  </label></td><td>:</td><td>
                            <input type="text" name="pref_state" id="pref_state" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                            <label for="pref_state" class="error" generated="true"></label></td></tr>
                    <tr><td>
                            <label for="pref_zip"  > Zip Code  </label></td><td>:</td><td>
                            <input type="text" name="pref_zip" id="pref_zip" class="transparent" style=" width: 400px;" readonly="readonly"/> 
                            <label for="pref_zip" class="error" generated="true"></label></td></tr>



                </table>
                <div>
                    <span class="underline_title" >Disbursement Method</span><br/>
                    <input type="checkbox" checked="" id="monthly" style="margin-left: 20px;margin-top: 5px;"/><label for="monthly" style="margin-left: 10px;">Monthly check</label><br/>
                    <input type="checkbox" checked="" id="reach" style="margin-left: 20px;margin-top: 5px;"/><label for="reach" style="margin-left: 10px;">When the amount reaches</label>
                    <div id="slider-range-min"></div>
                    <br/>
                    <p>
                        <input type="text" class="style_text" id="amounts" name="amounts" readonly style="background: none;border: none;margin-left: 30px; font-size: 0.8em;"/>

                    </p>
                    <br/>
                    <div style="float: right;" class="buttons" id="disbursementbtn" onclick="widgets.gim.disbursement();" >Save</div>
                </div>
                <div>
                    <span class="underline_title" >Payment Method</span><br/>
                    <input type="checkbox" checked="" id="method" style="margin-left: 20px;margin-top: 5px;"/><label for="method" style="margin-left: 10px;">Check</label>
                </div>
            </div>
        </div>

    </div>
    <div style="display: none;">

        <div name="lightbox" id="lightbox" class="blue-box2" style="height: 400px; width: 400px; ">


            <div id="box-header" >
                <!--                 <form action="encript.php" method="post"
                              enctype="multipart/form-data">
                           
                            <input type="file" name="file" id="file" style="background: transparent;border: none;"><br>
                           
                            <input type="submit" name="submit" value="Submit" style="background: transparent;">
                        </form>-->
                <div id="g_image" style="float: left;width: 70px;"></div>
                <div style="float: left;width: 100px;">
                    <div id="head">
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
                        </table></div>
                    <div id="image" style="display: none;width: 200px;">

                        <form action="encript.php" method="post"
                              enctype="multipart/form-data">

                            <input type="file" name="file" id="file" >
                            <input type="hidden" name="im_old" id="im_old" value="<?php if (isset($_SESSION['img'])) {
    echo $_SESSION['img'];
} ?>"/>
                            <input type="button" onclick="widgets.gim.cancel()" value="Cancel" style="float: left;"/>
                            <input type="submit" name="submit" value="Submit" style="float: right;"/>
                        </form>
                    </div></div>
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
                        <div style="width: 300px;float: left;overflow: hidden;">
                            <table class="pref" >

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
