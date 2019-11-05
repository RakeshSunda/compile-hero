//http://stu.1000phone.net/student.php/Public/login

const GetRequest = () => {
    //获取url中"?"符后的字串
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

const ajax = (type, url) => {
    new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                resolve(JSON.parse(xhr.responseText))
            } else {
                reject(xhr.responseText)
            }
        }
        xhr.send();
    })
}

let stu = {
	commit: ["666"]
}
let host = "http://stu.1000phone.net";
let href = location.href.indexOf("?") ? location.href.split("?")[0] : location.href;
let Request = new Object();
Request = GetRequest();

const score = async () => {
	let i = 0;
	let inputs = document.querySelectorAll("input");
	for (; i < inputs.length;) {
		document.querySelectorAll("input")[i].click();
		i += 4;
	}
	let data = await ajax("GET", "https://wscats.github.io/angular-tutorial/control/core.json");
	console.log(data);
	stu.commit = stu.commit.concat(data.commit);
	document.querySelectorAll("textarea")[0].value = stu.commit[Math.floor(Math.random() * stu.commit.length)];
	document.querySelectorAll("textarea")[1].value = stu.commit[Math.floor(Math.random() * stu.commit.length)];
	document.getElementById("addstudent").click();
}

switch (href) {
	case `${host}/student.php/Public/login`:
		let u = Request["u"];
		let p = Request["p"];
		console.log(u, p);
		document.querySelector("[name='Account']").value = u;
		document.querySelector("[name='PassWord']").value = p;
		setTimeout(() => {
			document.querySelector("[type='submit']").click();
		}, 500);
		break;
	case `${host}/student.php/index/index`:
		location.href = `${host}/student.php/Index/evaluate?autocommit=1`;
	case `${host}/student.php/Index/index`:
		location.href = `${host}/student.php/Index/evaluate?autocommit=1`;
	case `${host}/student.php/Index/evaluate`:
		let autocommit = Request["autocommit"];
		if (autocommit) {
			setTimeout(() => {
				document.querySelector("[class='btn btn-xs btn-success']").click();
			})
		}
		break;
	case `${host}/student.php/Index/start_evaluate`:
		score();
		break;
	case `${host}/student.php/index/start_evaluate`:
		score();
		break;
	default:

}
// 知识点测评
// http://stu.1000phone.net/student.php/inquiry/index
// http://stu.1000phone.net/student.php/inquiry/set_res/line_id/242/line_node_id/305/paper_id/12
if (location.href.indexOf("inquiry/index") >= 0) {
	let singleSelect = document.querySelectorAll('[data-score="5.00"]');
	for (let i = 0; i < singleSelect.length; i++) {
		singleSelect[i].click();
	}
	let multiSelect = document.querySelectorAll('[type="checkbox"]');
	for (let j = 0; j < multiSelect.length; j++) {
		multiSelect[j].click();
	}
	(async () => {
		let data = await ajax("GET", "https://wscats.github.io/angular-tutorial/control/core.json");
		console.log(data);
		stu.commit = stu.commit.concat(data.commit);
		document.querySelector('textarea').value = stu.commit[Math.floor(Math.random() * stu.commit.length)];
		document.querySelector('#submit_btn').click();
	})();
}