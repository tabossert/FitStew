<?php
/* 
 * This file contains the HTML that needs to crate fancybox forms 
 */
?>

<div id="container" >    
    <div class="animate form" style="display: none;">
        <form  action="owner.php" autocomplete="on" name="frmOwnersLogin" id="frmOwnersLogin" class="wrapper" method="POST"> 
            <input type="hidden" name="token" id="token" value=""/>
             <input type="hidden" name="gid" id="gid" />
              <input type="hidden" name="gname" id="gname" />
            <div class="innerForm" style="width:300px;">
                <h1>Sign-in</h1> 
               
                <p> <label for="username" class="uname" > Username </label>
                    <input id="username" name="username" maxlength="12" class="required" required="required" type="text" placeholder="myusername or mymail@mail.com"/>
                    <label for="username" class="error" generated="true"></label>
                </p>
                <p id="msg">
                    <label class="msg" ></label>
                </p>
                
                <p> 
                    <label for="password" class="youpasswd"> Password </label>
                    <input id="password" name="password" maxlength="10" minLength="6" class="required" required="required" type="password" placeholder="eg. X8df!90EO" /> 
                    <label for="password" class="error" generated="true"></label>
                </p>
                <p class="keeplogin"> 
                    <input type="checkbox" name="loginkeeping" id="loginkeeping" value="loginkeeping" /> 
                    <label for="loginkeeping">Keep me logged in</label> 
                </p>
                <p class="errorlogin">
                    <div id="loginError"></div>
                </p>
                <p class="login button"> 
                  <input type="button" value="Login" class="btnsub" onclick="widgets.login()" /> 
                </p>
            </div>
        </form>
    </div>
</div>
