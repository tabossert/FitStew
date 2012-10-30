<?php
//Set title
$title = "ZuneFit Gym Panel";
?>
<!-- Header Start -->
<?php include 'html/header.php'; ?>
<!-- Header End -->

<input type="hidden" name="token" id="token" value="<?php echo $_SESSION['token']; ?>"/>
<div class="middle-container">
    <div class="left-part">
        <div class="blue-box1">



            <div id="Servicebox" style="display: none">
                <div class="blue-box1">

                    <div id="service">
                        <div>
                            <p class="underline_title">Type</p>
                            <table>
                                <tr>
                                    <td><input type="checkbox" id="boxing" ></td><td>Boxing</td>                      
                                    <td><input type="checkbox" id="cycling"></td> <td>Cycling</td>
                                    <td><input type="checkbox" id="cycling"></td> <td>Etc</td>
                                </tr>
                            </table>
                            <br/>
                            <p class="underline_title">New Type</p>

                            <input type="text" name="newType" id="newType" placeholder="Type"/> &nbsp; <button onclick="widgets.gim.addType();"> add </button>

                            <br/>
                            <p class="underline_title">Keywords</p>
                            <input type="text" name="keywords" id="keywords" placeholder="Keywords"/>

                            <button onclick="widgets.gim.Search();" >Search</button>
                        </div>
                    </div>
                    <div id="keyword-result"></div>
                </div>
            </div>



        </div>

    </div>

    <div class="tabs">
        <ul class="tabs-link">
            <li><a href="#" >Profile</a></li>
            <li><a href="ownerServices.php" >Services</a></li>
            <li><a href="ownerAnalytics.php" >Analytics</a></li>
            <li><a href="#" >Preferences</a></li>
        </ul>
    </div>

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
