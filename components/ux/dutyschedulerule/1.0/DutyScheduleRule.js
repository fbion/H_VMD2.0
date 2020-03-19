Ext.define("vmd.ux.DutyScheduleRule" ,{
	extend:"Ext.Panel",
	requires:vmd.getCmpDeps([]),
	version:"1.0",
	xtype:"vmd.ux.DutyScheduleRule",
	title:"Panel",
	header:false,
	border:false,
	width:798,
	layout:"auto",
	autoHeight:true,
	autoScroll:false,
	beforerender:"DutyScheduleRule_beforerender",
	listeners:{
		beforerender:function(){
	this.DutyScheduleRule_beforerender(this)
}
	},
	uxCss:".vmd-radiogroup .x-form-element {    cursor: pointer;    font-size: 14px;}.vmd-radiogroup .x-form-element label {    cursor: pointer;}.classBorder {    border-top: 1px solid #e3e2e8;    border-bottom: 1px solid #e3e2e8;}.crewBorder {    border-top: 1px solid #e3e2e8;}.schedule input {    text-align: center;    padding-left: 0;}.classTable {    width: 100%;}.classRow {    clear: both;}.bcmc {    width: 50px;    text-align: center;    margin-left: 10px;    float: left;}.vmd-global div.dhxcombo_material.dhxcombo_actv {    border-left: none;    border-right: none;    border-top: none;}.kssj {    width: 100px;    float: left;}.kssj .dhxcombo_material {    border-radius: 0;    border-left: none;    border-right: none;    border-top: none;}.kssj .dhxcombo_material input {    text-align: center;}.kssj .dhxcombo_material:hover {    border-left: none;    border-right: none;    border-top: none;}.jssj {    width: 100px;    float: left;}.jssj .dhxcombo_material {    border-radius: 0;    border-left: none;    border-right: none;    border-top: none;}.jssj .dhxcombo_material input {    text-align: center;}.jssj .dhxcombo_material:hover {    border-left: none;    border-right: none;    border-top: none;}.crewTable {    width: 798px;    border-collapse: collapse;}.crewTable th {    text-align: center;    height: 32px;}.th1 {    width: 80px;    border-right: 1px solid #e3e2e8;}.th2 {    width: auto;    border-right: 1px solid #e3e2e8;}.th3 {    width: 160px;}.myTable {    width: 798px;    border-collapse: collapse;}.myTable td {    height: 32px;}.td1 {    width: 80px;    text-align: center;    border-right: 1px solid #e3e2e8;    border-bottom: 1px solid #e3e2e8;}.td2 {    width: auto;    text-align: left;    border-right: 1px solid #e3e2e8;    border-bottom: 1px solid #e3e2e8;}.td3 {    width: 160px;    text-align: center;    border-bottom: 1px solid #e3e2e8;}.myTable a {    color: #3285ff;    margin-right: 10px;    cursor: pointer;}.myTable a:hover {    text-decoration: underline;}.myTable span {    margin-left: 5px;}.myTable i {    color: #3285ff;    cursor: pointer;}",
	initComponent: function(){
		function resetCmpScope() {
                    var cmpList = me._reloadCmpList;
                    Ext.each(cmpList, function (name) {
                        var cmpObj = eval(name);
                        cmpObj && (cmpObj._beforeRender = function (_cmp) {
                            var id = vmd.core.getCmpId(_cmp);
                            id&&eval(id + "= _cmp")
                        })
                    })
                }
			var uxPage = this;
var newWin;
var restCrewNum = 0;
var pageParams = {};
var myData = {};

window.checkedMemberList = [];
window.unCheckedMemberList = [];
window.cumulateCheckedMemberIdList = [];
window.crewInfo = {};

window.addMember = function(containerId, rowIndex, unitCode, crewId) {
    // 创建一个新窗口（有url指向） 
    newWin = new vmd.window({
        url: "/release/12efebd0-5bd2-4d64-8582-fe88888e55ac/hwasutu5ch/hwWxPVpZSY/hw383f501d.html",
        title: "添加班组成员",
        enableLoading: true, //启用进度加载
        width: 200,
        height: 400,
        maximizable: false,
        auto: false, //auto为true 自动适应窗口，配合offset使用
        params: {
            dwdm: unitCode,
            crewid: crewId,
            containerid: containerId,
            rowindex: rowIndex
        } //url中追加的编码的参数，json格式 
    });
    newWin.show();
};

window.addRandomMember = function(containerId, rowIndex) {
    try {
        var memberColObj = $("#" + containerId).find(".td2");
        if(memberColObj.eq(rowIndex).html() !== "") {
            var memberObj = memberColObj.eq(rowIndex).find("div");
            for(var m = 0; m < memberObj.length; m++) {
                unCheckedMemberList.push({
                    memberid: memberObj.eq(m).attr("id"),
                    membername: memberObj.eq(m).find("span").text()
                });

                $("#" + memberObj.eq(m).attr("id")).remove();
                cumulateCheckedMemberIdList.splice(cumulateCheckedMemberIdList.indexOf(memberObj.eq(m).attr("id")), 1);
            }
        }

        var count = 0;
        for(var k = 0; k < memberColObj.length; k++) {
            if(memberColObj.eq(k).html() === "") {
                count++;
            }
        }

        var memberListCount = Math.floor(unCheckedMemberList.length / count);
        var memberList = [];
        do {
            for(var i = 0; i < unCheckedMemberList.length; i++) {
                var random = Math.random();
                if(random > 0.5) {
                    memberList.push({
                        memberid: unCheckedMemberList[i].memberid,
                        membername: unCheckedMemberList[i].membername
                    });
                    cumulateCheckedMemberIdList.push(unCheckedMemberList[i].memberid);
                    unCheckedMemberList.splice(i, 1);
                }
                if(memberList.length == memberListCount) {
                    break;
                }
            }
        } while(memberList.length < memberListCount);

        var rowObj = $("#" + containerId).find(".crewRow").eq(rowIndex);
        var memberTdObj = rowObj.find(".td2");
        var memberHtml = "";
        for(var i = 0; i < memberList.length; i++) {
            memberHtml += "<div id='" + memberList[i].memberid + "' style='float:left;'>";
            memberHtml += "<span>" + memberList[i].membername + "</span>";
            memberHtml += "<i class='icon-remove' onclick='deleteMember(\"" + memberList[i].memberid + "\",\"" + memberList[i].membername + "\");'></i>";
            memberHtml += "</div>";
        }
        memberTdObj.append(memberHtml);

        if(count == 2) {
            var index = 0;
            for(var l = 0; l < memberColObj.length; l++) {
                if(memberColObj.eq(l).html() === "") {
                    index = l;
                }
            }
            addUncheckedMember(index, containerId);
        }
    } catch (msg) {
        console.log(msg);
    }
};

window.deleteMember = function(id, name) {
    $("#" + id).remove();
    var index = cumulateCheckedMemberIdList.indexOf(id);
    cumulateCheckedMemberIdList.splice(index, 1);

    unCheckedMemberList.push({
        memberid: id,
        membername: name
    });
};

window.addCheckedMember = function(containerId, rowIndex) {
    var memberColObj = $("#" + containerId).find(".td2");
    var count = 0;
    for(var k = 0; k < memberColObj.length; k++) {
        if(memberColObj.eq(k).html() === "") {
            count++;
        }
    }

    var rowObj = $("#" + containerId).find(".crewRow").eq(rowIndex);
    var memberTdObj = rowObj.find(".td2");
    var memberHtml = "";
    for(var i = 0; i < checkedMemberList.length; i++) {
        memberHtml += "<div id='" + checkedMemberList[i].memberid + "' style='float:left;'>";
        memberHtml += "<span>" + checkedMemberList[i].membername + "</span>";
        memberHtml += "<i class='icon-remove' onclick='deleteMember(\"" + checkedMemberList[i].memberid + "\",\"" + checkedMemberList[i].membername + "\");'></i>";
        memberHtml += "</div>";
    }
    memberTdObj.append(memberHtml);

    if(count == 2) {
        var index = 0;
        for(var l = 0; l < memberColObj.length; l++) {
            if(memberColObj.eq(l).html() === "") {
                index = l;
            }
        }
        addUncheckedMember(index, containerId);
    }
};

window.addUncheckedMember = function(rowIndex, containerId) {
    var rowObj = $("#" + containerId).find(".crewRow").eq(rowIndex);
    var memberTdObj = rowObj.find(".td2");
    var memberHtml = "";
    for(var i = 0; i < unCheckedMemberList.length; i++) {
        memberHtml += "<div id='" + unCheckedMemberList[i].memberid + "' style='float:left;'>";
        memberHtml += "<span>" + unCheckedMemberList[i].membername + "</span>";
        memberHtml += "<i class='icon-remove' onclick='deleteMember(\"" + unCheckedMemberList[i].memberid + "\",\"" + unCheckedMemberList[i].membername + "\");'></i>";
        memberHtml += "</div>";
        cumulateCheckedMemberIdList.push(unCheckedMemberList[i].memberid);
    }
    unCheckedMemberList = [];
    memberTdObj.append(memberHtml);
};

window.myTip = function(msg) {
    vmd.tip(msg, "info");
};

window.closeWin = function() {
    newWin.hide();
};

function getCrewMember() {
    if(!pageParams.crewstore) {
        return;
    }

    unCheckedMemberList = [];
    for(var i = 0; i < pageParams.crewstore.length; i++) {
        unCheckedMemberList.push(pageParams.crewstore[i]);
    }
}

function createTimeList() {
    var timeList = [];
    for(var i = 0; i < 24; i++) {
        if(i < 10) {
            timeList.push({
                value: i.toString(),
                text: "0" + i + ":00"
            });
            timeList.push({
                value: i.toString(),
                text: "0" + i + ":30"
            });
        } else {
            timeList.push({
                value: i.toString(),
                text: i + ":00"
            });
            timeList.push({
                value: i.toString(),
                text: i + ":30"
            });
        }
    }
    return timeList;
}

function createClassRow(rowNum) {
    $("#" + classDiv.id).html("");
    for(var i = 0; i < rowNum; i++) {
        var rowHtml = "";
        rowHtml += "<div class='classRow'>";
        rowHtml += "<div style='float:left;'><input class='vmd-text-border-bottom bcmc bcmc" + i + "'></div>";
        rowHtml += "<div style='float:left;line-height:32px;'>：</div>";
        rowHtml += "<div class='kssj" + i + " kssj'></div>";
        rowHtml += "<div style='float:left;line-height:32px;'>至</div>";
        rowHtml += "<div class='jssj" + i + " jssj'></div>";
        rowHtml += "</div>";
        $("#" + classDiv.id).append(rowHtml);

        var rowObj = $("#" + classDiv.id).find(".classRow");

        var kssjObj = rowObj.find(".kssj" + i)[0];
        var kssjCombo = new dhtmlXCombo(kssjObj);
        kssjCombo.addOption(createTimeList());
        kssjCombo.readonly(true);

        var jssjObj = rowObj.find(".jssj" + i)[0];
        var jssjCombo = new dhtmlXCombo(jssjObj);
        jssjCombo.addOption(createTimeList());
        jssjCombo.readonly(true);

        setRowTemplate(rowNum, i, kssjCombo, jssjCombo);
    }
}

function setRowTemplate(rowNum, rowIndex, startTimeObj, endTimeObj) {
    var rowObj = $("#" + classDiv.id).find(".classRow");
    switch (rowNum) {
        case 2:
            if(rowIndex === 0) {
                rowObj.find(".bcmc" + rowIndex).val("白班");
                startTimeObj.setComboValue(8);
                endTimeObj.setComboValue(20);
            }
            if(rowIndex == 1) {
                rowObj.find(".bcmc" + rowIndex).val("夜班");
                startTimeObj.setComboValue(20);
                endTimeObj.setComboValue(8);
            }
            break;
        case 3:
            if(rowIndex === 0) {
                rowObj.find(".bcmc" + rowIndex).val("早班");
                startTimeObj.setComboValue(8);
                endTimeObj.setComboValue(16);
            }
            if(rowIndex == 1) {
                rowObj.find(".bcmc" + rowIndex).val("中班");
                startTimeObj.setComboValue(16);
                endTimeObj.setComboValue(0);
            }
            if(rowIndex == 2) {
                rowObj.find(".bcmc" + rowIndex).val("晚班");
                startTimeObj.setComboValue(0);
                endTimeObj.setComboValue(8);
            }
            break;
        default:
            rowObj.find(".bcmc" + rowIndex).val((rowIndex + 1) + "班");
            break;
    }
}

function createCrewRow(rowNum) {
    crewInfo.dwdm = pageParams.dwdm;
    crewInfo.crewid = pageParams.crewid;
    $("#" + crewDiv.id + " .myTable").html("");
    for(var i = 0; i < rowNum; i++) {
        var rowHtml = "";
        rowHtml += "<tr class='crewRow'>";
        rowHtml += "<td class='td1'>" + (i + 1) + "组</td>";
        rowHtml += "<td class='td2'></td>";
        rowHtml += "<td class='td3'>";
        rowHtml += "<a class='btnAdd' onclick='addMember(\"" + crewDiv.id + "\"," + i + ",\"" + crewInfo.dwdm + "\",\"" + crewInfo.crewid + "\");'>添加</a>";
        rowHtml += "<a class='btnRandom' onclick='addRandomMember(\"" + crewDiv.id + "\"," + i + ");'>随机</a>";
        rowHtml += "</td>";
        rowHtml += "</tr>";
        $("#" + crewDiv.id + " .myTable").append(rowHtml);
    }
}

function getScheduleCount() {
    myData.dwdm = pageParams.dwdm;
    myData.crewid = pageParams.crewid;
    myData.crewname = pageParams.crewname;
    myData.day_class_count = dayClass.getValue();
    myData.rest_class_count = restClass.getValue();
}

function getClassData() {
    var classData = [];
    var rowObj = $("#" + classDiv.id).find(".classRow");
    for(var i = 0; i < rowObj.length; i++) {
        classData.push({
            class_name: rowObj.find(".bcmc" + i).val(),
            class_start_time: rowObj.find(".kssj" + i + " input").eq(0).val(),
            class_end_time: rowObj.find(".jssj" + i + " input").eq(0).val()
        });
    }
    myData.duty_class = classData;
}

function getGroupData() {
    var crewData = [];
    var rowObj = $("#" + crewDiv.id).find(".crewRow");
    for(var i = 0; i < rowObj.length; i++) {
        var groupMember = "";
        var groupMemberObj = rowObj.find(".td2").eq(i).find("div");
        for(var j = 0; j < groupMemberObj.length; j++) {
            if(j > 0) {
                groupMember += ",";
            }
            groupMember += groupMemberObj.eq(j).attr("id");
        }
        crewData.push({
            group_name: rowObj.find(".td1").eq(i).text(),
            group_member: groupMember
        });
    }
    myData.duty_crew = crewData;
}

function loadScheduleCount(data) {
    dayClass.setValue(data.day_class_count);
    restClass.setValue(data.rest_class_count);
}

function loadClassData(data) {
    var rowObj = $("#" + classDiv.id).find(".classRow");
    for(var i = 0; i < data.duty_class.length; i++) {
        rowObj.find(".bcmc" + i).val(data.duty_class[i].class_name);
        rowObj.find(".kssj" + i + " input").eq(0).val(data.duty_class[i].class_start_time);
        rowObj.find(".jssj" + i + " input").eq(0).val(data.duty_class[i].class_end_time);
    }
}

function loadGroupData(data) {
    var rowObj = $("#" + crewDiv.id).find(".crewRow");
    for(var i = 0; i < data.duty_crew.length; i++) {
        var groupMemberId = data.duty_crew[i].group_member_id.split(",");
        var groupMemberName = data.duty_crew[i].group_member_name.split(",");
        var memberTdObj = rowObj.find(".td2").eq(i);
        var memberHtml = "";
        for(var j = 0; j < groupMemberId.length; j++) {
            memberHtml += "<div id='" + groupMemberId[j] + "' style='float:left;'>";
            memberHtml += "<span>" + groupMemberName[j] + "</span>";
            memberHtml += "<i class='icon-remove' onclick='deleteMember(\"" + groupMemberId[j] + "\",\"" + groupMemberName[j] + "\");'></i>";
            memberHtml += "</div>";
            cumulateCheckedMemberIdList.push(groupMemberId[j]);
        }
        memberTdObj.append(memberHtml);
    }
}

function DutyScheduleRule_beforerender(sender) {
    pageParams.dwdm = uxPage.unitcode;
    pageParams.crewid = uxPage.crewid;
    pageParams.crewname = uxPage.crewname;
    pageParams.crewstore = uxPage.crewstore;
    getCrewMember();
}

function dayClass_blur(sender, e) {
    var dayNum = dayClass.getValue();
    var reg = new RegExp("^[1-9]\d*$");
    if(!reg.test(dayNum)) {
        if(dayNum !== "") {
            vmd.tip("请输入10以下的正整数！", "warning");
            return;
        } else {
            return;
        }
    }
    switch (dayNum) {
        case "2":
            createClassRow(2);
            break;
        case "3":
            createClassRow(3);
            break;
        default:
            createClassRow(dayNum);
            break;
    }
}

function restClass_blur(sender, e) {
    var dayNum = restClass.getValue();
    var reg = new RegExp("^[0-9]\d*$");
    if(!reg.test(dayNum)) {
        if(dayNum !== "") {
            vmd.tip("请输入10以下的整数！", "warning");
            return;
        } else {
            return;
        }
    }

    getCrewMember();
    createCrewRow(parseInt(dayNum) + 1);
    restCrewNum = parseInt(dayNum) + 1;
    hwRadioGroup.setValue("manual");
    cumulateCheckedMemberIdList = [];
}

function hwRadioGroup_change(sender, checked) {
    if(restClass.getValue() === "") {
        vmd.tip("请输入休班次数！", "warning");
        return;
    }

    getCrewMember();
    createCrewRow(restCrewNum);
    cumulateCheckedMemberIdList = [];

    var tableObj = $("#" + crewDiv.id + " .myTable");
    if(checked.inputValue == "auto") {
        for(var i = 0; i < restCrewNum; i++) {
            addRandomMember(crewDiv.id, i, restCrewNum);
        }
        tableObj.find(".btnRandom").hide();
    }
}
			this.DutyScheduleRule_beforerender=DutyScheduleRule_beforerender;
		this.items=[
			{
				xtype:"vmd.div",
				id:"scheduleDiv",
				layoutConfig:{
					align:"middle",
					pack:"start"
				},
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:798,
				height:32,
				autoWidth:false,
				layout:"hbox",
				cls:"schedule",
				items:[
					{
						xtype:"label",
						id:"label",
						text:"一天",
						margins:"0 0 0 10"
					},
					{
						xtype:"textfield",
						id:"dayClass",
						allowBlank:true,
						enableKeyEvents:true,
						cls:"vmd-text-border-bottom",
						width:30,
						blur:"dayClass_blur",
						listeners:{
							blur:dayClass_blur
						}
					},
					{
						xtype:"label",
						id:"label1",
						text:"班，休",
						margins:""
					},
					{
						xtype:"textfield",
						id:"restClass",
						allowBlank:true,
						enableKeyEvents:true,
						cls:"vmd-text-border-bottom",
						width:30,
						blur:"restClass_blur",
						listeners:{
							blur:restClass_blur
						}
					},
					{
						xtype:"label",
						id:"label2",
						text:"班",
						margins:""
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"classDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:798,
				height:100,
				autoHeight:false,
				layout:"auto",
				cls:"classBorder",
				autoScroll:true,
				html:"<select id=\"myTime\" style=\"display: none;\">    <option value=\"0\">00:00</option>    <option value=\"1\">01:00</option>    <option value=\"2\">02:00</option>    <option value=\"3\">03:00</option>    <option value=\"4\">04:00</option>    <option value=\"5\">05:00</option>    <option value=\"6\">06:00</option>    <option value=\"7\">07:00</option>    <option value=\"8\">08:00</option>    <option value=\"9\">09:00</option>    <option value=\"10\">10:00</option>    <option value=\"11\">11:00</option>    <option value=\"12\">12:00</option>    <option value=\"13\">13:00</option>    <option value=\"14\">14:00</option>    <option value=\"15\">15:00</option>    <option value=\"16\">16:00</option>    <option value=\"17\">17:00</option>    <option value=\"18\">18:00</option>    <option value=\"19\">19:00</option>    <option value=\"20\">20:00</option>    <option value=\"21\">21:00</option>    <option value=\"22\">22:00</option>    <option value=\"23\">23:00</option></select>"
			},
			{
				xtype:"vmd.div",
				id:"crewTypeDiv",
				layoutConfig:{
					align:"middle",
					pack:"start"
				},
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:798,
				height:32,
				autoWidth:false,
				layout:"hbox",
				items:[
					{
						xtype:"label",
						id:"label3",
						text:"人员搭配：",
						margins:"0 0 0 10"
					},
					{
						xtype:"radiostoregroup",
						id:"hwRadioGroup",
						width:120,
						height:28,
						labelField:"label",
						valueField:"value",
						checkedField:"checked",
						boxFieldName:"myRadio",
						vertical:false,
						cls:"vmd-radiogroup",
						columns:2,
						change:"hwRadioGroup_change",
						listeners:{
							change:hwRadioGroup_change
						},
						items:[
							{
								xtype:"radio",
								id:"autoRadio",
								boxLabel:"自动",
								inputValue:"auto"
							},
							{
								xtype:"radio",
								id:"manualRadio",
								boxLabel:"手动",
								checked:true,
								inputValue:"manual"
							}
						]
					}
				]
			},
			{
				xtype:"vmd.div",
				id:"crewDiv",
				autoEl:"div",
				border:false,
				backgroundRepeat:"no-repeat",
				backgroundPosition:"top left",
				width:798,
				height:133,
				autoHeight:false,
				layout:"auto",
				cls:"crewBorder",
				autoScroll:true,
				html:"<div>    <table class=\"crewTable\">        <tr>            <th class=\"th1\">班组</th>            <th class=\"th2\">人员搭配</th>            <th class=\"th3\">操作</th>        </tr>    </table></div><div style=\"height: 99px; overflow-x: hidden; overflow-y: auto; border-top: 1px solid #e3e2e8;\">    <table class=\"myTable\">    </table></div>"
			}
		]
		this.callParent();
		vmd.core.compositeCmpInit(this.items, this);
		var me = this;eval(me.defineVars);
		resetCmpScope();
			this.getData= function(){
getScheduleCount();
getClassData();
getGroupData();
return myData;
	}
		this.generateClass= function(num){
dayClass.setValue(2);
createClassRow(num);
	}
		this.generateCrew= function(num){
restCrewNum = 3;
createCrewRow(num);
	}
		this.loadData= function(data){
loadScheduleCount(data);
createClassRow(data.day_class_count);
loadClassData(data);
restCrewNum = parseInt(data.rest_class_count) + 1;
createCrewRow(restCrewNum);
loadGroupData(data);
unCheckedMemberList = [];
	}
	Ext.util.CSS.removeStyleSheet("vmd.ux.DutyScheduleRule");
		this.uxCss&&Ext.util.CSS.createStyleSheet(vmd.replaceResVars(this.uxCss), "vmd.ux.DutyScheduleRule");
	}
})