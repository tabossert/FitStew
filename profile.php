<div name="lightboxw" id="lightboxw" class="blue-box2" style="height: 400px; width: 400px; ">
    <table class="pref3">
        <tr><td>
                <label for="class_name" class="clslabels"> Service  </label> 
            </td><td><td>:<td>
                <input type="text" name="class_name" id="class_name" class="round" placeholder="Karate" />
            </td>  </tr>  
        <tr> <td>
                <label for="class_price" class="clslabels"> Price  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_price" id="class_price" class="round" placeholder="10"/>
            </td>  
        </tr>
         <tr> <td>
                <label class="clslabels"> Duration  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_dur_hrs" id="class_dur_hrs" class="round" placeholder="Hrs" style="width:50px" maxlength="2"/> :
                <input type="text" name="class_dur_min" id="class_dur_min" class="round" placeholder="Min" style="width:50px" maxlength="2"/>
            </td>  
        </tr>
        <tr> <td>
                <label for="class_mon" class="clslabels"> Monday  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_mon" id="class_mon" class="round sch" value="00:00"/>
            </td>  
        </tr>
        <tr> <td>
                <label for="class_tue" class="clslabels"> Tuesday  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_tue" id="class_tue" class="round sch" value="00:00"/>
            </td>  
        </tr>
        <tr> <td>
                <label for="class_wed" class="clslabels"> Wednesday  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_wed" id="class_wed" class="round sch" value="00:00"/>
            </td>  
        </tr>
        <tr> <td>
                <label for="class_thu" class="clslabels"> Thursday  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_thu" id="class_thu" class="round sch" value="00:00"/>
            </td>  
        </tr>
        <tr> <td>
                <label for="class_fri" class="clslabels"> Friday  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_fri" id="class_fri" class="round sch" value="00:00"/>
            </td>  
        </tr>
        <tr> <td>
                <label for="class_sat" class="clslabels"> Saturday  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_sat" id="class_sat" class="round sch" value="00:00"/>
            </td>  
        </tr>
        <tr> <td>
                <label for="class_sun" class="clslabels"> Sunday  </label>
            </td> <td><td>:<td>
                <input type="text" name="class_sun" id="class_sun" class="round sch" value="00:00"/>
            </td>  
        </tr>
    </table>
    <div class="buttons" onclick="widgets.gim.addclass()">Add Class</div>
    <div id="confirm" style="color: #CB0000;font-size: 17px;float: right;"></div>
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
                                <label for="g_name" class="clslabels"> Gym&nbsp;Name  </label> 
                            </td><td><td>:<td>
                                <input type="text" name="g_name" id="g_name" class="transparent" readonly=""/>
                            </td>  </tr>  
                        <tr> <td>
                                <label for="g_rate" class="clslabels"> Rate  </label>
                            </td> <td><td>:<td>
                                <input type="text" name="g_rate" id="g_rate" class="transparent" readonly=""/>
                            </td>  
                        </tr>
                    </table></div>
                <div id="image" style="display: none;width: 200px;">

                    <form action="encript.php" method="post"
                          enctype="multipart/form-data">

                        <input type="file" name="file" id="file" >
                        <input type="hidden" name="im_old" id="im_old" value="<?php
if (isset($_SESSION['img'])) {
    echo $_SESSION['img'];
}
?>"/>
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
                                    <label for="g_address" class="clslabels" >  Address  </label></td><td>:</td><td>
                                    <input type="text" name="g_address" id="g_address" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_city" class="clslabels" >  City  </label></td><td>:</td><td>
                                    <input type="text" name="g_city" id="g_city" class="transparent" readonly=""/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_state"  class="clslabels"> State  </label></td><td>:</td><td>
                                    <input type="text" name="g_state" id="g_state" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_zip" class="clslabels"> Zip&nbsp;Code  </label></td><td>:</td><td>
                                    <input type="number" name="g_zip" id="g_zip" class="transparent" readonly=""/>
                                </td></tr>
                            <tr><td>
                                    <label for="g_phone" class="clslabels" >  Phone  </label></td><td>:</td><td>
                                    <input type="text" name="g_phone" id="g_phone" class="transparent" readonly=""/ > 
                                </td></tr>
                            <tr><td>
                                    <label for="g_email" class="clslabels" >  email  </label></td><td>:</td><td>
                                    <input type="email" name="g_email" id="g_email" class="transparent" readonly=""/>
                                </td></tr>                        

                            <tr><td>
                                    <label for="g_contact" class="clslabels" > Contact  </label></td><td>:</td><td>
                                    <input type="text" name="g_contact" id="g_contact" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_fb" class="clslabels" > Facebook  </label></td><td>:</td><td>
                                    <input type="text" name="g_fb" id="g_fb" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_twt" class="clslabels" > Twitter  </label></td><td>:</td><td>
                                    <input type="text" name="g_twt" id="g_twt" class="transparent" readonly=""/> 
                                </td></tr>
                            <tr><td>
                                    <label for="g_url" class="clslabels" > Web site  </label></td><td>:</td><td>
                                    <input type="text" name="g_url" id="g_url" class="transparent" readonly=""/> 
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