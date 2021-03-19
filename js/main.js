var $main = $("#main");

var $sign_up = $("#sign_up");
var $cancle = $("#cancle_button");
var $sign_button = $("#sign_up_button");

var intoroduce = document.getElementById('open-introduce');
var hobby = document.getElementById('open-hobby');
var roadmap = document.getElementById('open-roadmap');
var login = document.getElementById('open-login');

var check_id = false;
var check_pw = false;
var check_birth = false;
var check_login = JSON.parse(localStorage.getItem("user")) || null;

var cnt = 0;

var hobby_array = [];

// console.log($("[type=text]"));

$(document).ready(function(){
  change_user();
})

function User(user_id, user_pw, user_name, user_birth, user_gender, user_hobby, user_like,
  user_etc){
    this.id = user_id;
    this.pw = user_pw;
    this.name = user_name;
    this.birth = user_birth;
    this.gender = user_gender;
    this.hobby = user_hobby;
    this.like = user_like;
    this.etc = user_etc;
}

function Hobby(hobby_name, hobby_array){
  this.hobby_name = hobby_name;
  this.hobby_array = hobby_array;
}


function onen_popup() {
    $(this).next().css("display", "block");
    $main.addClass("opacity");
    $(".link").css("display", "none");
    change_user();
}   

function off_popup() {
    $(".fa-times").parent(".modal_wrap").css("display", "none");
    $main.removeClass("opacity");
    $(".link").css("display", "block");
 }

 function change_hobby(){
  var user = JSON.parse(localStorage.getItem("user"));
  hobby_array.length = 0;
     if(cnt == user.hobby.length-1){
        $(".hobby").find("div").eq(cnt).css("display", "none").removeClass("now");
        cnt = 0;
        $(".hobby").find("div").eq(cnt).css("display", "block").addClass("now");
        return false;
     }
     $(".hobby").find("div").eq(cnt).css("display", "none").removeClass("now");
    //  console.log($(".hobby").find("div").eq(cnt).find("span"));
     $(".hobby").find("div").eq(++cnt).css("display", "block").addClass("now");
 }

function login_alert(){
  alert("로그인을 해야합니다");
}

function admin_alert(){
  alert("관리자 계정이 아닙니다");
}

function login_user(){
  if(check_login){
    intoroduce.removeEventListener('click', login_alert);
    hobby.removeEventListener('click', login_alert);
    intoroduce.addEventListener('click', onen_popup);
    hobby.addEventListener('click', onen_popup);
    if(check_login.id == "simpson"){
      roadmap.removeEventListener('click', admin_alert);
      roadmap.addEventListener('click', onen_popup);
    }
    else{
      roadmap.removeEventListener('click', onen_popup);
      roadmap.addEventListener('click', admin_alert);
    }
  } else {
    roadmap.addEventListener('click', admin_alert);
    intoroduce.addEventListener('click', login_alert);
    hobby.addEventListener('click', login_alert);
  }
}

login_user();

 login.addEventListener('click', onen_popup);
 
 function sign_up_open(){
    $main.css("display", "none");
    $("#sign_up_page").css("display", "block");
    check_id = false;
    check_pw = false;
    check_birth = false;
 }

 function sign_up_close(){
     $("#sign_up_page").css("display", "none");
    $main.css("display", "block");
 }

 $sign_up.on("click",sign_up_open);
 $cancle.on("click",sign_up_close);

 function create_user(){
     var user_id = $("#sign_up_id").val();
     var user_pw = $("#sign_up_pw").val();
     var user_name = $("#sign_up_name").val();
     var user_birth = $("#sign_up_birth").val();
     var user_gender = $("[name=gender]:checked").val();
     var user_hobby = $("#sign_up_hobby").val().split(",");
     var user_like = $("#sign_up_like").val();
     var user_etc = $("#sign_up_etc").val();

    var user = new User(user_id, user_pw, user_name, user_birth, user_gender, user_hobby,user_like, user_etc);
    var users = JSON.parse(localStorage.getItem("users")) || [];
    
    if(check_id && check_pw && check_birth){
     users.push(user);
     var jsonUsers = JSON.stringify(users);
     localStorage.setItem("users", jsonUsers);

    //  localStorage.setItem(user_id, user_hobby);
    
     alert("회원가입 성공!");
     $("#sign_up_page").css("display", "none");
     $main.css("display", "block");
    }
    else{
     alert("모든 조건을 확인해주세요");
    }
     
 }


$sign_button.on("click",create_user);


 //아이디 검사
 function id_check(){
    var user_id = $("#sign_up_id").val();
    // console.log(user_id);
    var users = JSON.parse(localStorage.getItem("users")) || [];

    if(user_id != null){
      if (/^[A-Za-z0-9]{4,}$/.test(user_id) == false) {
        alert("아이디 조건이 틀렸습니다.");
        return false
      } else {
        alert("이 아이디는 가능합니다");
        check_id = true;
        return false
      }
    }

    $.each(users, function (i, user){
    if (/^[A-Za-z0-9]{4,}$/.test(user_id) == false) {
      alert("아이디 조건이 틀렸습니다.");
      return false
    }
    else if(user_id == user.id) {
      alert("아이디가 중복입니다");
      return false
    } else {
      alert("이 아이디는 가능합니다");
      check_id = true;
      return false
    }
  });

 }
 $("#check_id_button").on("click", id_check);

 //비밀번호 검사
 function pw_check(){
    var user_pw = $("#sign_up_pw").val();
    // console.log(user_pw);
    if (/^[A-Za-z0-9!~@#$%^&*()?+=\/]{4,}$/.test(user_pw) == false) {
        alert("비밀번호 조건이 틀렸습니다.");
      }else{
        alert("이 비밀번호는 가능합니다");
        check_pw = true;
      }
 }
 $("#check_pw_button").on("click", pw_check);

 //생년월일 검사
 function birth_check(){
    var user_birth = $("#sign_up_birth").val();
    // console.log(user_birth);
    if (/([0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))/.test(user_birth) == false) {
        alert("생년월일 조건이 틀렸습니다.");
      }else{
        alert("확인되었습니다.");
        check_birth = true;
      }
 }
 $("#check_birth_button").on("click", birth_check);

 function change_user(){
  var user = JSON.parse(localStorage.getItem("user"));

    if(user){
      $("#open-introduce").text(user.id.toUpperCase());
      if(user.id != "simpson"){
        $("#name").text("name : "+user.name);
        var today = new Date();
        // console.log(user.birth);
        var year = user.birth.substring(0,4);
        var month = user.birth.substring(4,6);
        var date = user.birth.substring(6,7);
        var birth = new Date(year, month, date);
        var age = today.getFullYear() - birth.getFullYear() + 1;
        $("#age").text("age : " + age);
        $("#like").text("like : " + user.like);
        $("#etc").text(user.etc).addClass("new_line");
      } else {
        $("#etc").removeClass("new_line");
        $("#name").text("박정현");
        $("#age").text("29");
        $("#like").text("지금은 자바를 제일 좋아합니다");
        $("#etc").html("집안 사정과 적성에 맞지 않아 대학을 휴학 후 공무원 준비중 친구의소개로 프로그래밍을 시작했습니다.<br /><br />다른 공부들과 달리 자기가 직접 만들어 간다는 것에 흥미를느꼈습니다.<br /><br />첫 프로젝트에서 아쉬움이 많아 refactoring을 공부 하고 싶지만지금은 진도 따라잡기 바쁘네요 ㅠㅜ... <br /><br />간단한 게임도 만들고 싶고 어플도 만들고 싶고 하고 싶은건 많지만천천히 차분히 갈려고 합니다!")
      }
    

    //hobby content 초기화
    $("div.hobby").find(".content").remove();

    for(var i in user.hobby){
      var source = "<div><header></header><hr /></div>"
      var num = 1*i + 1;

      var content = $(source).appendTo(".hobby");

      content.addClass("content").attr("id", "hobby"+num);

      var hobby_id = "#hobby" + num;
      $(hobby_id).find("header").text(user.hobby[i]);

      var hobby_name = localStorage.getItem(user.id+user.hobby[i]);

      if(hobby_name != null){
        hobby_array = hobby_name.split(",");
      }

        for(var x in hobby_array){
          // console.log(hobby_array[x]);
          $("<p>● &nbsp" + hobby_array[x] + "</p>").appendTo(hobby_id);
        }

      if(i == 0){
        content.addClass("now")
      }
    }
  }
    var $textarea = $("<textarea></textarea>");
    $textarea.appendTo(".hobby").addClass("addcontent");
    var $save_button =$("<button>save</button>");
    $save_button.appendTo(".hobby").addClass("save_content");
    var $delete_button =$("<button>delete</button>");
    $delete_button.appendTo(".hobby").addClass("delete_content");

    $(".hobby").find(".content").on("click", change_hobby);
    
    
    $save_button.on("click", function(){
      var now_content = $textarea.parent().find(".now");
      var hobby_name = now_content.find("header").text();
      var addtxt = $textarea.val();
      $("<p>● &nbsp" + addtxt + "</p>").appendTo(now_content).addClass("hobby_span");

      $.each($(now_content).find(".hobby_span"), function(index, span){
        hobby_array.push($(span).text().substring(3));
      });

      localStorage.setItem(user.id + hobby_name, hobby_array);
      hobby_array.length = 0;
      // console.log(hobby_array);
      $textarea.val("");
    })

    $delete_button.on("click", function(){
      var now_content = $textarea.parent().find(".now");
      var hobby_name = now_content.find("header").text();
      // console.log(user.id + hobby_name);
      localStorage.removeItem(user.id + hobby_name);
      $(now_content).find("p").remove();
    });
 }

 function login_check(){
  var id = $("#login_id").val();
  var pw = $("#login_pw").val();
  var cnt = 0;

  var users = JSON.parse(localStorage.getItem("users")) || [];
  $.each(users, function (i, user){
    if(id == user.id){
      if(pw == user.pw){
        alert("로그인 성공.");
        $("#login_id").val("");
        $("#login_pw").val("");
        var jsonUser = JSON.stringify(user);
        localStorage.setItem("user", jsonUser);
        check_login = user;
        login_user();
        change_user();
        off_popup();
        cnt++;
        return false;
      }
    }
  });
  if(cnt == 0){
    alert("아이디나 비밀번호가 틀렸습니다.");
  }
}

 $("#login_confirm").on("click", login_check);

 $("#log_out").on("click", function(){
  localStorage.removeItem("user");
 });

 function save_user(){
  var txt = JSON.stringify(localStorage.getItem("users"));

  // console.log(txt.split("},"));

  // for(let i=0; i<addtxt.length; i++){
  //   text(addtxt[i], 50, i*27+50);
  //   txt.push(addtxt[i]);
  // }

  // saveStrings(txt, 'user.txt');
}

save_user();

var typingBool = false; 

var typingIdx=0;
var typingTxt = "BACK-END를 목표로.JAVA : 베이스로 두기. SQL : ???. HTML/CSS: 코드를 보고 이해할 정도로. JAVASCRIPT : refactoring 연습. SERVER : 아직 모른다.ANDROID: 안드로이드 스튜디오. ??? : 아직 잘 모르겠다."
typingTxt=typingTxt.split("");
var tyInt;

function typing(){ 
  
  if(typingIdx<typingTxt.length){
    if(typingTxt[typingIdx] == "."){
      $("<p></p>").appendTo(".typing").addClass("typing");
    }
    else{
      $(".typing").last().append("<span>"+typingTxt[typingIdx]+"</span>");
    }
    typingIdx++; 
  } else{ 
    clearInterval(tyInt);
  } 
} 

function typing_init(){
  if(typingBool==false){
    typingBool=true;
    tyInt = setInterval(typing,100);
  }
}

$("#road_map_start").on("click",typing_init);