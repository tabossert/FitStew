<?php
/*
 * This file contains the HTML that needs to crate fancybox forms 
 */
?>
<div id="container" >    
    <div class="animate form" style="display: none;">
        <form  action="mysuperscript.php" autocomplete="on" name="frmOwnersLogin" id="frmOwnersLogin" class="wrapper"> 
            <div class="innerForm" style="width:300px;">
                <h1>Sign-in</h1> 
                <p> 
                    <label for="username" class="uname"> Username </label>
                    <input id="username" name="username" required="required" type="text" placeholder="myusername or mymail@mail.com"/>
                </p>
                <p id="msg">
                    <label class="msg"></label>
                </p>
                <p> 
                    <label for="password" class="youpasswd"> Password </label>
                    <input id="password" name="password" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                </p>
                <p class="keeplogin"> 
                    <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
                    <label for="loginkeeping">Keep me logged in</label>
                </p>
                <p class="login button"> 
                    <input type="submit" value="Login" onclick="widgets.login()"/> 
                </p>
            </div>
        </form>
    </div>
</div>