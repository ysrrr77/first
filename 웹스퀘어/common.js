/**
 * <pre>
 * 1.업무명 : 산재보상시스템
 * 2.프로그램명 : ui 관련 함수
 * 3.ASIS : 
 * 4.설명 : ui 관련 함수
 * <pre>
 * @author 김준성
 * @since  2024. 11. 19.
 * @version 1.0
 * 
 * <pre>
 * ------------------------------------------------------------------------
 *  Modification Information
 * ------------------------------------------------------------------------
 *  수정일               수정자            수정내용
 * ------------------------------------------------------------------------
 * 2024. 11. 19.     김준성          [SIA] Release 1.0
 * </pre> 
 */

$(document).ready(function(){
	
	/**
	 * 화면 초기 로딩
	 * @lastUpdate 2016.08.28 
	 * @author InswaveSystems
	 * @since 2016.08.28
	 */
	scwin.initMainLoad = function() {
		$p.top().scwin.commonCodeList = [];
		wfm_side.getWindow().scwin.fn_getInitData();
	};
	
	//lnb : 단계별 닫기
	$('body').delegate('.panel_lnb .lnb_toggle_wrap button', 'click', function(){ //25-01-24 Edit 이종환 : LNB 펼침/닫힘 버튼 두개의 버튼 배치로 조건 수정
		var lnb_state = $('.panel_lnb');
		
		
		if($(this).hasClass('btn_open')){
			switch(true) {
				case lnb_state.hasClass('close_01'):
					$('.panel_lnb, .btmbox').removeClass('close_01');
					$(this).addClass('hide');
					break;
				case lnb_state.hasClass('close_02'):
					$('.panel_lnb, .btmbox').removeClass('close_02');
					$('.panel_lnb, .btmbox').addClass('close_01');
					$(this).removeClass('hide').siblings().removeClass('hide');
					break;
				default:
					$('.panel_lnb, .btmbox').addClass('close_01');
			}
		} else {
			switch(true) {
				case lnb_state.hasClass('close_01'):
					$('.panel_lnb, .btmbox').removeClass('close_01');
					$('.panel_lnb, .btmbox').addClass('close_02');
					$(this).addClass('hide').siblings().removeClass('hide');
					break;
				case lnb_state.hasClass('close_02'):
					$('.panel_lnb, .btmbox').removeClass('close_02');
					break;
				default:
					$('.panel_lnb, .btmbox').addClass('close_01');
					$(this).siblings().removeClass('hide');
			}
		}
	});
	
	/* 신규 LNB 적용 후 제거할 스크립트 : 신규 적용 전 현업 확인 용 */
	$('body').delegate('.panel_lnb .btn_toggle', 'click', function(){
		var lnb_state = $('.panel_lnb');
		
		switch(true) {
			case lnb_state.hasClass('close_01'):
				$('.panel_lnb, .btmbox').removeClass('close_01');
				$('.panel_lnb, .btmbox').addClass('close_02');
				break;
			case lnb_state.hasClass('close_02'):
				$('.panel_lnb, .btmbox').removeClass('close_02');
				break;
			default:
				$('.panel_lnb, .btmbox').addClass('close_01');
		}
	});
	/*//신규 LNB 적용 후 제거할 스크립트 : 신규 적용 전 현업 확인 용 */
	
	/* 헤더 메뉴 [화면넓게보기] 기능 */
//	$('body').delegate('header .service_menu .wide > *', 'click', function(){
//		if($(this).hasClass('on')){
//			$('.panel_lnb').attr('class', $(this).addClass('on').attr('data-lnb'));
//			$(this).removeClass('on').removeAttr('data-lnb');
//		} else {
//			$(this).addClass('on').attr('data-lnb',$('.panel_lnb').attr('class'));
//			if(!$('.panel_lnb').attr('class').indexOf('close_02') > -1){
//				$('.panel_lnb').attr('class',$('.panel_lnb').attr('class').replace($('.panel_lnb').attr('class').split('close_')[1],'02'));
//			} else if($('.panel_lnb').attr('class').indexOf('close_') == -1){
//				alert('a')
//				$('.panel_lnb').addClass('close_02')
//			}
//		}
//	});
	
});

/* input focus : placeholder custom 시 사용 */
function placeholder(_target){
    _target = $(_target);
    _target.find('i.label').click(function(){
        $(this).hide();
        $(this).siblings('input').focus();
    });
    _target.find('input').focus(function(){
        $(this).siblings('i.label').hide();
    });
    _target.find('input').blur(function(){
        if($(this).val().length < 1){
            $(this).siblings('i.label').show();
        }
    });
}

/* 선체 클래스 제거 */
function removeClassAll(_target, _class) {	
    for (let i = 0; i < _target.parentElement.querySelectorAll(_target.nodeName).length; i++) {
    	_target.parentElement.querySelectorAll(_target.nodeName)[i].classList.remove(_class);
    }
}

/* 화면 확대 축소 */
var zoom = {
		opt:{
			font:1, //font scale test
			s:1,
			max:9, //확대 경계값
			min:1, //축소 경계값
			r:0.05,  //스케일 단계값
			c:1
		}, in:function(){
			
			if(zoom.opt.s < zoom.opt.max){
				zoom.opt.c+=zoom.opt.r;
				
				$('body').css('transform', 'scale('+zoom.opt.c+')');
				$('.scale .screen em').text(Math.floor(zoom.opt.c*100)+'%');
				
				zoom.opt.s++;
			}
		}, out:function(){
			
			if(zoom.opt.s > zoom.opt.min){
				zoom.opt.c-=zoom.opt.r;
				
				$('body').css('transform', 'scale('+zoom.opt.c+')');
				$('.scale .screen em').text(Math.floor(zoom.opt.c*100)+'%');
				
				zoom.opt.s--;
			}
		}, font:function(e){ //font scale test
			if(e.target.getAttribute('class').indexOf('in') > -1){
				if(zoom.opt.font < 5){
					zoom.opt.font++;
					$('html').attr('class','fontScale_'+zoom.opt.font);
					
					$('.scale .font em').text((zoom.opt.font+13)+'px');
				}
			} else {
				if(zoom.opt.font > 1){
					zoom.opt.font--;
					$('html').attr('class','fontScale_'+zoom.opt.font);
					
					$('.scale .font em').text((zoom.opt.font+13)+'px');
				}
			}
		}
}

/************************************************* 공통코드조회 필요한 함수 ********************************************/
/**
 * 현재 창이 BrowserPopup인지 아닌지 확인한다.
 *
 * @return {Object} ret
 *         {String} ret.type  = bp:BrowserPopup, wp:WframePopup, np:Popup이 아님
 *         {String} ret.depth = bp일 경우 팝업이 몇 번 중첩으로 띄워진 상태인지 체크
 * @example var isActive = com.isBrowserPopup();
 */
com.isBrowserPopup = function() {
	var ret = {type:"np",depth:0};
	var isPopup = $p.isPopup();
	//P : 팝업, T: 탭컨텐츠, W: 윈도우컴포넌트
	//if(isPopup == true || typeof $p.top().wdc_main === "undefined") {
	if(isPopup == true || com.isNotEmpty(window.gcm.G_CURR_POP_ID)) {
		//browserPopup에서 사용할 때 $p.parent()를 이용해야해서 분기처리
		// 250226 수정
		// if(typeof $p.top().scwin.commonCodeList !== "undefined") {
		if (typeof $p.parent().$p.top().gdlt_BookmarkMenuList !== "unedfined") {
			//팝업인데 index.xml 파일내 존재하는 객체에 단순히 $p.top()으로 접근가능하다면 wframePopup 이다.
			ret.type = "wp";
		// } else if(typeof $p.parent().$p.top().scwin.commonCodeList !== "undefined") {
		} else if(typeof $p.parent().$p.top().gdlt_BookmarkMenuList !== "undefined") {
			//팝업인데 index.xml 파일내 존재하는 객체에 단순히 $p.parent().$p.top()으로 접근가능하다면  browserPopup 이다.
			ret.type = "bp";
			ret.depth = 1;
		// } else if(typeof $p.parent().$p.parent().$p.top().scwin.commonCodeList !== "undefined") {
		} else if(typeof $p.parent().$p.parent().$p.top().gdlt_BookmarkMenuList !== "undefined") {
			//팝업인데 index.xml 파일내 존재하는 객체에 단순히 $p.parent().$p.top()으로 접근가능하다면  browserPopup 이다.
			ret.type = "bp";
			ret.depth = 2;
		// } else if(typeof $p.parent().$p.parent().$p.parent().$p.top().scwin.commonCodeList !== "undefined") {
		} else if(typeof $p.parent().$p.parent().$p.parent().$p.top().gdlt_BookmarkMenuList !== "undefined") {
			//팝업인데 index.xml 파일내 존재하는 객체에 단순히 $p.parent().$p.top()으로 접근가능하다면  browserPopup 이다.
			ret.type = "bp";
			ret.depth = 3;
		}
	}

	return ret;
};

/**
 * 코드성 데이터와 컴포넌트의 nodeSet(아이템 리스트)연동 기능을 제공한다. *
 * @param {Object} codeOptions {"code" : "코드넘버", "compID" : "적용할 컴포넌트명"
 * 							   , index1 : "기능1 조회조건", index2 : "기능2 조회조건", index3 : "기능3 조회조건", addDataNm : "동적으로생성되는 데이터셋명칭에 덧붙일문자열"
 * , view : "Label에보여지는 타입[default:name,code,both(code + " " + name)]"}
 * @param {requestCallback} callbackFunc 콜백 함수
 * @memberOf com
 * @author InswaveSystems
 * @example
 * code : 공통그룹코드
 * compID : 조회된 공통코드 목록을 BIND할 컴포넌트 객체명
 * index1~3 : INDEX1~INDEX3 까지의 컬럼 값을 조건 값으로 이용할 수 있음. 내부 값을 콤마로 구분하면 IN 절로 검색되며, 단일 값이라면 EQUAL 검색
 * addDataNm : 동적으로 생성되는 DataList 객체는 dlt_commonCode 이름 뒤에 공통그룹코드가 붙게되는데, 이 이름뒤에 추가로 붙일 문자열 값이다. 같은 공통그룹코드를 각기 다른 컴포넌트에 다른 조건으로 입력해야할 때 사용된다.
 * dataNm : 동적으로 생성되는 DataList 명칭이며, 이 값이 들어있으면 addDataNm이나 기본 데이터리스트명 규칙(dlt_commonCode+공통그룹코드)은 무시된다.
 * view : LABEL(NAME)에 보여질 방식을 결정(defualt:name 코드명 노출, code:공통코드 값을 노출, both:공통코드 + ' ' + 코드명1 조합으로 노출)
 * compYn : 컴포넌트에 Bind작업을 할 것인지 여부(defualt:Y, N: 컴포넌트에 바인드하지 않고 동적으로 생성된 DataList객체에 담아놓기만 한다.)
 * var codeOptions = [ { code : "Z0030", compID : "scb_Eopmu", index1 : "A", index2 : "", index3 : "", view : "both" },
 *					 { code : "Z0030", compID : "scb_Eopmu", view : "name" },
 *					 { code : "Z0030", compID : "scb_Eopmu" },
 *					 { code : "Z0030", compID : "scb_Eopmu,sbx_CommCodePart2"},
 *					 { code : "Z0030", compID : "scb_Eopmu,sbx_CommCodePart2", addDataNm : "2"},
 *					 { code : "Z0030", compID :"grd_CommCodeSample:JOB_CD"} ];
 *	 com.setCommonCode(codeOptions,callbackFunc);
 */
com.setCommonCode = function(codeOptions, callbackFunc) {
	var codeOptionsLen = 0;

	if (codeOptions) {
		codeOptionsLen = codeOptions.length;
	} else {
		$p.log("=== com.setCommonCode Parameter Type Error ===\nex) com.setCommonCode([{\"code:\":\"04\",\"compID\":\"sbx_Gender\"}],\"scwin.callbackFunction\")\n===================================");
		return;
	}

	var i, j, codeObj, dltId, dltIdArr = [], paramCode = "", paramIndex1 = "", paramIndex2 = "", paramIndex3 = "", compArr, compArrLen, tmpIdArr;
	var dataListOption = _getCodeDataListOptions(gcm.COMMON_CODE_INFO.FILED_ARR);
	var paramViewType = "";
	var addDataNm = "";
	var dataNm = "";
	var isActivePopupType = com.isBrowserPopup();
	var paramCnt = 0;

	for (var i = 0; i < codeOptionsLen; i++) {
		codeObj = codeOptions[i];
		try {
			//addDataNm 값 초기화
			if(com.isEmpty(codeObj.addDataNm)) {
				codeObj.addDataNm = "";
			}

			//dataNm값이 들어왔다면 해당 값으로 Datalist명을 생성하고, 그렇지 않으면 기본 datalist명(dlt_commonCode)에 addDataNm 값을 붙인 형태로 생성한다.
			if(com.isEmpty(codeObj.dataNm)) {
				codeObj.dataNm = "";
				dltId = gcm.DATA_PREFIX + codeObj.code + (codeObj.addDataNm ?? '');
			} else {
				dltId = codeObj.dataNm;
			}
			codeOptions[i].dltId = dltId;

			if (paramCnt > 0) {
				paramCode += "|";
				paramIndex1 += "|";
				paramIndex2 += "|";
				paramIndex3 += "|";
				paramViewType += "|";
				addDataNm += "|";
				dataNm += "|";
			}
			paramCnt++;
			paramCode += codeObj.code;
			(codeObj.index1 != null) ? paramIndex1 += codeObj.index1 : paramIndex1 += "";
			(codeObj.index2 != null) ? paramIndex2 += codeObj.index2 : paramIndex2 += "";
			(codeObj.index3 != null) ? paramIndex3 += codeObj.index3 : paramIndex3 += "";
			(codeObj.view != null) ? paramViewType += codeObj.view : paramViewType += "";
			(codeObj.addDataNm != null) ? addDataNm += codeObj.addDataNm : addDataNm += "";
			(codeObj.dataNm != null) ? dataNm += codeObj.dataNm : dataNm += "";

			//browserPopup에서 사용할 때 $p.parent()를 이용해야해서 분기처리
			if(isActivePopupType.type != "bp") {
				// 메인 화면일 때
				if (!$p.top().scwin.commonCodeList[dltId]) {
					dltIdArr.push(dltId);
					dataListOption.id = dltId;
					$p.data.create(dataListOption); // 동일한 id의 DataCollection이 존재할 경우, 삭제 후 재생성함
				} else {
					dataListOption.id = dltId;
					$p.data.create(dataListOption);
					var dataListObj = $p.getComponentById(dataListOption.id);
					dataListObj.setJSON(com.getJSON($p.top().scwin.commonCodeList[dltId]));

				}
			} else {
				// 팝업일 때
				var commonCodeListFnc;
				if(isActivePopupType.depth == 1) {
					commonCodeListFnc = $p.parent().$p.top().scwin.commonCodeList[dltId];
				} else if(isActivePopupType.depth == 2) {
					commonCodeListFnc = $p.parent().$p.parent().$p.top().scwin.commonCodeList[dltId];
				} else if(isActivePopupType.depth == 3) {
					commonCodeListFnc = $p.parent().$p.parent().$p.parent().$p.top().scwin.commonCodeList[dltId];
				} // 어디에 씀?

				dltIdArr.push(dltId);
				dataListOption.id = dltId;
				$p.data.create(dataListOption); // 동일한 id의 DataCollection이 존재할 경우, 삭제 후 재생성함
			}

			//컴포넌트에 Bind할 것인지 여부 default 옵션 처리
			if(com.isEmpty(codeObj.compYn)) {
				codeObj.compYn = "Y";
			}

			if (codeObj.compID && codeObj.compYn == "Y") {
				compArr = (codeObj.compID).replaceAll(" ", "").split(",");
				compArrLen = compArr.length;
				(codeObj.view != null) ? tmpView = codeObj.view : tmpView = "name";

				for (j = 0; j < compArrLen; j++) {
					tmpIdArr = compArr[j].split(":");
					if (tmpIdArr.length === 1) {
						// 기본 컴포넌트에 대한 Node Setting 설정
						var comp = $p.getComponentById(tmpIdArr[0]);
						comp.setNodeSet("data:" + dltId, gcm.COMMON_CODE_INFO.LABEL, gcm.COMMON_CODE_INFO.VALUE);
					} else {
						// gridView 컴포넌트에 대한 Node Setting 설정
						var gridObj = $p.getComponentById(tmpIdArr[0]);
						gridObj.setColumnNodeSet(tmpIdArr[1], "data:" + dltId, gcm.COMMON_CODE_INFO.LABEL, gcm.COMMON_CODE_INFO.VALUE);
					}
				}
			}
		} catch (ex) {
			$p.log("com.setCommonCode Error");
			$p.log(JSON.stringify(codeObj));
			$p.log(ex);
			continue;
		}
	}
	
	var searchCodeGrpOption = {
		id : "dma_searchCode",
		// action : "/st/gi/selectSetCommonCodeList.do",
		//action : "/nes/biz/z/zz01/selectGtGroupCdMokrokForGlobal.do",
		action : "/cm/cm00/0001/CM0001100P_E002.do",
		target : (dltIdArr.length == 0) ? null : "data:json," + com.strSerialize(dltIdArr),
		isShowMeg : false
	};

	searchCodeGrpOption.submitDoneHandler = function(e) {
		for (const codeGrpDataListId in e.responseJSON) {
			// 이름 변경
			responseDataId = codeGrpDataListId;

			// index1, 2, 3
			const dltIdList = codeOptions.map(o=>{return o.dltId});
			if (dltIdList.some(s=>s===responseDataId)) {
				const searchData = codeOptions.find(f=>f.dltId === responseDataId);
				const targetObj = $p.getComponentById(responseDataId);
				let filteredData = e.responseJSON[responseDataId];

				Object.entries(searchData).forEach(([k, v]) => {
					if(k.startsWith('index') && com.isNotEmpty(v)){
						const conditions = v.replace(/ /g, '').split(',');
						if(conditions.length > 0) {
							filteredData = filteredData.filter(dt=>{
								if(conditions.includes(dt[k.toUpperCase()])){return dt;}
							});
						}
					}
				});

			    if(com.isNotEmpty(targetObj)) {
			    	targetObj.setJSON(filteredData);
			    }
			}

			// 이전 코드
		    if (codeGrpDataListId.indexOf(gcm.DATA_PREFIX) > -1) {
				if(isActivePopupType.type != "bp") {
					$p.top().scwin.commonCodeList[codeGrpDataListId] = com.strSerialize(e.responseJSON[codeGrpDataListId]);
				} else {
					if(isActivePopupType.depth == 1) {
						$p.parent().$p.top().scwin.commonCodeList[codeGrpDataListId] = com.strSerialize(e.responseJSON[codeGrpDataListId]);
					} else if(isActivePopupType.depth == 2) {
						$p.parent().$p.parent().$p.top().scwin.commonCodeList[codeGrpDataListId] = com.strSerialize(e.responseJSON[codeGrpDataListId]);
					} else if(isActivePopupType.depth == 3) {
						$p.parent().$p.parent().$p.parent().$p.top().scwin.commonCodeList[codeGrpDataListId] = com.strSerialize(e.responseJSON[codeGrpDataListId]);
					}
				}
			}
		}

		if (typeof callbackFunc === "function") {
			callbackFunc();
		}
	}

	if (paramCode !== "") {
		com.executeSubmission_dynamic(searchCodeGrpOption, {
			"dma_INGTGROUPCDMOKROK" : {
				"GT_GROUP_CD" : paramCode,
				"INDEX1" : paramIndex1,
				"INDEX2" : paramIndex2,
				"INDEX3" : paramIndex3,
				"VIEWTYPE" : paramViewType,
				"DATA_PREFIX" : gcm.DATA_PREFIX,
				"ADD_DATA_NM" : addDataNm,
				"DATA_NM" : dataNm
			}
		});
	} else {
		if (typeof callbackFunc === "function") {
			callbackFunc();
		}
	}

	// dataList를 동적으로 생성하기 위한 옵션 정보를 반환한다.
	function _getCodeDataListOptions(infoArr) {
		var option = {
			"type" : "dataList",
			"option" : {
				"baseNode" : "list",
				"repeatNode" : "map"
			},
			"columnInfo" : []
		};

		for ( var idx in infoArr) {
			option.columnInfo.push({
				"id" : infoArr[idx]
			});
		}
		return option;
	};
};

/**
 * XML, JSON 객체를 String 타입으로 반환한다.
 *
 * @param {Object} object String으로 변환할 JSON 객체
 * @memberOf com
 * @author InswaveSystems
 * @return {String} String으로 변환된 객체
 */
com.strSerialize = function(object) {
	if (typeof object == 'string') {
		return object;
	} else if (com.isJSON(object)) {
		return JSON.stringify(object);
	} else if (com.isXmlDoc(object)) {
		return WebSquare.xml.serialize(object);
	} else {
		return object;
	}
};

/**
 * JSON Object인지 여부를 검사한다.
 *
 * @param {Object} jsonObj JSON Object가 맞는지 검사할 JSON Object
 * @memberOf com
 * @author InswaveSystems
 * @return {Boolean} true or false
 * @example
 * com.isJSON("");
 * // return 예시) false
 * com.isJSON( {"tbx_sPrjNm": "1", "tbx_sPrtLv": "2", "tbx_sReqLv": "3"} );
 * // return 예시) true
 */
com.isJSON = function(jsonObj) {
	if (typeof jsonObj !== 'object')
		return false;
	try {
		JSON.stringify(jsonObj);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * mdi 화면 유무 (팝업/메인 구분)
 *
 * var tObj = com.topObj();
 */
com.topObj = function() {
	var rtObj = "";
	if(typeof $p.top().wdc_main !== "undefined") {
		rtObj = $p.top();
	} else if(typeof $p.top().$p.parent().$p.top().wdc_main !== "undefined") {
		rtObj = $p.top().$p.parent().$p.top();
	} else {
		// 팝업에서 팝업화면을 호출하는 경우 때문에 추가 
		rtObj = $p.top().$p.parent().$p.top().$p.parent().$p.top();
	}
	return rtObj;
};

/**
 * Submission를 실행합니다.
 *
 * @param {Object} options com.createSubmission의 options 참고
 * @param {Object} requestData 요청 데이터
 * @param {Object} obj 전송중 disable시킬 컴퍼넌트
 * @memberOf com
 * @author InswaveSystems
 * @example
 * var searchCodeGrpOption = {
 *		 id : "sbm_searchCodeGrp",
 *		 action : "serviceId=CD0001&action=R",
 *		 target : 'data:json,{"id":"dlt_codeGrp","key":"data"}',
 *		 submitDoneHandler : scwin.searchCodeGrpCallback, isShowMeg : false };
 * com.executeSubmission_dynamic(searchCodeGrpOption);
 */
com.executeSubmission_dynamic = function(options, requestData, obj) {
	var submissionObj = $p.getSubmission(options.id);

	if (submissionObj === null) {
		com.createSubmission(options);
		submissionObj = $p.getSubmission(options.id);
	} else {
		$p.deleteSubmission(options.id);
		com.createSubmission(options);
		submissionObj = $p.getSubmission(options.id);
	}

	return com.executeSubmission(submissionObj, requestData, obj);
};


/**
 * Submission 객체를 동적으로 생성한다.
 *
 * @param {Object} options Submission 생성 옵션 JSON 객체
 * @param {String} options.id submission 객체의 ID. 통신 모듈 실행 시 필요.
 * @param {String} options.ref 서버로 보낼(request) DataCollection의 조건 표현식.(조건에 때라 표현식이 복잡하다) 또는 Instance Data의 XPath.
 * @param {String} options.target 서버로 응답(response) 받은 데이터가 위치 할 DataCollection의 조건 표현식. 또는 Instance Data의 XPath.
 * @param {String} options.action 통신 할 서버 측 URI.(브라우저 보안 정책으로 crossDomain은 지원되지 않는다.)
 * @param {String} options.method [default: get, post, urlencoded-post]
 * - get : 파라메타를 url에 붙이는 방식 (HTML과 동일).
 * - post : 파라메타를 body 구간에 담는 방식 (HTML과 동일)
 * - urlencoded-post : urlencoded-post.
 * @param {String} options.mediatype [default: application/xml, text/xml, application/json, application/x-www-form-urlencoded]
 * application/x-www-form-urlencoded 웹 form 방식(HTML방식). application/json : json 방식. application/xml : XML 방식. text/xml : xml방식
 * (두 개 차이는 http://stackoverflow._com/questions/4832357 참조)
 * @param {String} options.mode [default: synchronous, synchronous] 서버와의 통신 방식.  asynchronous:비동기식.  synchronous:동기식
 * @param {String} options.encoding [default: utf-8, euc-kr, utf-16] 서버 측 encoding 타입 설정 (euc-kr/utf-16/utf-8)
 * @param {String} options.replace [default: none, all, instance] action으로부터 받은 response data를 적용 구분 값.
 *   - all : 문서 전체를 서버로부터 온 응답데이터로 교체.
 *   - instance : 해당되는 데이터 구간.
 *   - none : 교체안함.
 * @param {String} options.processMsg submission 통신 중 보여줄 메세지.
 * @param {String} options.errorHandler submission오류 발생 시 실행 할 함수명.
 * @param {String} options.customHandler submssion호출 시 실행 할 함수명.
 * @param {requestCallback} options.submitHandler {script type="javascript" ev:event="xforms-submit"} 에 대응하는 함수.
 * @param {requestCallback} options.submitDoneHandler {script type="javascript" ev:event="xforms-submit-done"} 에 대응하는 함수
 * @param {requestCallback} options.submitErrorHandler {script type="javascript" ev:event="xforms-submit-error"} 에 대응하는 함수
 * @memberOf com
 * @author InswaveSystems
 * @example
 * com.createSubmission(options);
 */
com.createSubmission = function(options) {
	var ref = options.ref || "";
	var target = options.target || "";

	//	var action = gcm.CONTEXT_PATH + gcm.SERVICE_URL + options.action; // ajax 요청주소
	var action = options.action;

	var mode = options.mode || gcm.DEFAULT_OPTIONS_MODE; // asynchronous(default)/synchronous
	var mediatype = options.mediatype || gcm.DEFAULT_OPTIONS_MEDIATYPE; // application/x-www-form-urlencoded
	var method = (options.method || "post").toLowerCase(); // get/post/put/delete
	var processMsg = options.processMsg || "";
	var instance = options.instance || "none";

	var submitHandler = (typeof options.submitHandler === "function") ? options.submitHandler
			: ((typeof options.submitHandler === "string") ? $p.id + options.submitHandler : "");
	var submitDoneHandler = (typeof options.submitDoneHandler === "function") ? options.submitDoneHandler
			: ((typeof options.submitDoneHandler === "string") ? $p.id + options.submitDoneHandler : "");
	var submitErrorHandler = (typeof options.submitErrorHandler === "function") ? options.submitErrorHandler
			: ((typeof options.submitErrorHandler === "string") ? $p.id + options.submitErrorHandler : "");

	var isShowMeg = false;
	var resJson = null;

	if ((options.isProcessMsg === true) && (processMsg === "")) {
		processMsg = "해당 작업을 처리중입니다";
	}

	if (typeof options.isShowMeg !== "undefined") {
		isShowMeg = options.isShowMeg;
	}

	var submissionObj = {
		"id" : options.id, // submission 객체의 ID. 통신 모듈 실행 시 필요.
		"ref" : ref, // 서버로 보낼(request) DataCollection의 조건 표현식.(조건에 때라 표현식이 복잡하다) 또는 Instance Data의 XPath.
		"target" : target, // 서버로 응답(response) 받은 데이터가 위치 할 DataCollection의 조건 표현식. 또는 Instance Data의 XPath.
		"action" : action, // 통신 할 서버 측 URI.(브라우저 보안 정책으로 crossDomain은 지원되지 않는다.)
		"method" : method, // [default: post, get, urlencoded-post] get:파라메타를 url에 붙이는 방식 (HTML과 동일).
		// post:파라메타를 body 구간에 담는 방식 (HTML과 동일). urlencoded-post:urlencoded-post.
		"mediatype" : mediatype, // application/json
		"encoding" : "UTF-8", // [default: utf-8, euc-kr, utf-16] 서버 측 encoding 타입 설정 (euc-kr/utf-16/utf-8)
		"mode" : mode, // [default: synchronous, synchronous] 서버와의 통신 방식. asynchronous:비동기식. synchronous:동기식
		"processMsg" : processMsg, // submission 통신 중 보여줄 메세지.
		"submitHandler" : submitHandler,
		"submitDoneHandler" : submitDoneHandler,
		"submitErrorHandler" : submitErrorHandler
	};

	$p.createSubmission(submissionObj);
};

(function($){
	$.siabiz = {
        getMessage : function(msg){
            return getMessage(msg, "");
        },

        /***
         * 메시지 코드로 메시지 내용 수신
         */
		getMessage : function(msg, parameter) {
            var method = "POST";
            var url = "/common/getMessage.do";

            if ( msg.length !=  7) {
                com.alert("getMessage : 코드값이 잘못되었습니다.\n" + msg)
                return;
            }
            
            var result = "";

            var ds_cond = {"msgTp": msg.substr(0,1), "msgCd" : msg.substr(1)};
            var data = JSON.stringify(ds_cond);
            this.sendJSONRequest(method, url, data, function(response) {
                if (response.success) {
                    result =  response.data
                }
            }, false);
            
            return this.messageConvert(result, parameter);
		},
		messageConvert:  function( source, params ) {
			if (arguments.length === 1) {
				return source
			}
			if (params === undefined) {
				return source;
			}
			if (arguments.length > 2 && params.constructor !== Array) {
				params = $.makeArray(arguments).slice(1);
			}
			if (params.constructor !== Array) {
				params = [params];
			}
			if (source === null) {
				return source;
			}
			if (params.length == 1) {
				return source.replace("@", params[0])
			}
			$.each(params, function (i, n) {
				source = source.replace("@", function () {
					return n;
				});
			});
			return source;
		},
	    sendJSONRequest : function(_method, _url, _data, _callback, _async) {
	        var self = this;
	        _async = _async === true || _async === false ? _async : true;

	        $.ajax({
	            type : _method,
	            url : _url,
	            data : _data,
	            async : _async,
	            dataType : "json",
	            contentType : 'application/json;charset=UTF-8',
	            success : function(response, status, xhr) {
	                self._success(response, _callback);
	            },
	            error : function(jqXHR, error, errorThrown) {
	                self._error(jqXHR, error, errorThrown);
	            },
	            beforeSend : function(request) {
	                //self._before();
	            },
	            complete : function() {
	                //self._after();
	            }
	        });
	    },
	    _success : function(response, _callback, isJSONP) {
	        var self = this;
	        if(typeof _callback === "function"){
	            _callback(response);
	        }
	    },
	    _error : function(xhr, status, error) {
	        var self = this;

	        var errorMsg;
	        var errorCode;
	        var callback = function() {};
	        if (xhr) {
	            if (xhr.status === 401) {
	                errorCode = "401";
	                errorMsg = "세션이 만료되었습니다.";
	            } else if (xhr.status === 403) {
	                errorCode = "403";
	                errorMsg = "요청에 대한 권한이 없습니다."
	            } else if (xhr.status === 404) {
	                errorCode = "404";
	                errorMsg = "페이지가 없습니다."
	            } else if (xhr.status === 500) {
	                errorCode = "500";
	                errorMsg = "시스템이 오류를 발생하였습니다."
	            } else if (xhr.status === 503) {
	                errorCode = "503";
	                errorMsg = "서비스를 사용할 수 없습니다."
	            } else {
	                errorCode = "ETC";
	                errorMsg = "시스템이 오류를 발생하였습니다."
	            }
	        } else {
	            errorCode = "ETC";
	            errorMsg = "시스템이 오류를 발생하였습니다."
	        }

	        if ( xhr.responseJSON ) {
	            if ( xhr.responseJSON.error ) {
	                errorCode = xhr.responseJSON.error;
	            }
	            if ( xhr.responseJSON.message ) {
	                errorMsg = xhr.responseJSON.message;
	            }
	            if ( xhr.responseJSON.redirectUri ) {
	                callback = function() {
	                    document.location.href = xhr.responseJSON.redirectUri;
	                }
	            }
	        }
	        com.alert(errorMsg, errorCode, callback);
	    }
	}
})(jQuery);

var temp;

/**
 * 특정 컴포넌트에 바인된 DataList나 DataMap의 컬럼 이름을 반환한다.
 *
 * @memberOf com
 * @param {Object} comObj 컴포넌트 객체
 * @return {String} 컬럼명
 */
com.getColumnName = function(comObj) {
	try {
		if ((typeof comObj.getRef) === "function") {
			var ref = comObj.getRef();
			var refArray = ref.substring(5).split(".");
			var dataCollectionName = refArray[0];
			var columnId = refArray[1];

			if ((typeof refArray !== "undefined") && (refArray.length === 2)) {
				var dataCollection = comObj.getScopeWindow().$p.getComponentById(dataCollectionName);
				var dataType = dataCollection.getObjectType().toLowerCase();
				if (dataType === "datamap") {
					return dataCollection.getName(columnId);
				} else if (dataType === 'datalist') {
					return dataCollection.getColumnName(columnId);
				}
			} else {
				return "";
			}
		}
	} catch (e) {
		$p.log("[com.getColumnName] Exception :: " + e.message);
	} finally {
		dataCollection = null;
	}
};

/**
 * 입력받은 문자열에 한글이 포함되어 있으면 true, 아니면 false를 리턴한다.
 *
 * @param {String} str 한글이 포함되어 있는지 검증 받을 문자열
 * @memberOf com
 * @author InswaveSystems
 * @return {Boolean} true or false
 * @example
 * com.isKoreanWord("abcd무궁화"); //return 예시) true
 * com.isKoreanWord("abcd"); //return 예시) false
 */
com.isKoreanWord = function(str) {
	var c;
	for (var i = 0; i < str.length; i++) {
		c = str.charAt(i);
		if (com.isKorean(c)) {
			return true;
		}
	}
	return false;
};

/**
 * 문자열 영단어 여부 체크
 *
 * @memberOf commonString
 * @param {String} word 문자열
 * @returns {Boolean} 영단어이면 true, 아니면 false
 * @description 입력받은 문자열이 모두 영단어이면 true, 아니면 false를 리턴한다
 * @example com.isEnglish("abcdefg");
 */
com.isEnglish = function(word) {

	var c;
	if (com.trim(word).length == 0) {
		return false;
	}

	for (var i = 0; i < word.length; i++) {
		c = word.toLowerCase().charAt(i);
		if (c < 'a' || c > 'z') {
			if ((c == " ") || (c == ".") || (c == "-")) {
				continue;
			}
			return false;
		}
	}
	return true;
};

/**
 * 메일주소의 유효성 검사를 한다.
 *
 * @memberOf valLib
 * @param {String} str 메일주소
 * @author InswaveSystems
 * @return {Boolean} 정상이면 true 반환, 비정상이면 false
 * @example
 * //정상
 * com.isEmail("emailTest@email.com")
 * //return 예시) true
 *
 * //비정상
 * com.isEmail("error or else")
 * //return 예시) false
 */
com.isEmail = function(str) {
    if (typeof str != "undefined" && str != "") {
        var format = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (format.test(str)) {
            return  true;
        } else {
            return  false;
        }
    }
    return  true;
};

/**
 * 내외국인 주민등록번호 유효성을 검사한다.
 *
 * @memberOf com
 * @param {String} str 문자열
 * @returns {Boolean} 올바른 번호가 아닌경우 false
 * @example com.checkPersonID("9701011234567");
 */
com.checkPersonID = function(str) {
 	var checkID = new Array(2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5);
	var i = 0, sum = 0;
	var temp = 0;
	var yy = "";
	if (str.length != 13) {
		return false;
	}
	for (i = 0; i < 13; i++) {
		if (str.charAt(i) < '0' || str.charAt(i) > '9') {
			return false;
		}
	}

	// foreigner PersonID Pass
	if (str.substring(6, 13) == "5000000" || str.substring(6, 13) == "6000000" || str.substring(6, 13) == "7000000"
			|| str.substring(6, 13) == "8000000") {
		return true;
	}
	for (i = 0; i < 12; i++) {
		sum += str.charAt(i) * checkID[i];
	}
	temp = sum - Math.floor(sum / 11) * 11;
	temp = 11 - temp;
	temp = temp - Math.floor(temp / 10) * 10;

	// 나이 (-) 체크
	if (str.charAt(6) == '1' || str.charAt(6) == '2' || str.charAt(6) == '5' || str.charAt(6) == '6') {
		yy = "19";
	} else {
		yy = "20";
	}

	if (parseInt(com.getCurrentServerDate('yyyy')) - parseInt(yy + str.substring(0, 2)) < 0) {
		return false;
	}
	// 외국인 주민번호 체크로직 추가
	if (str.charAt(6) != '5' && str.charAt(6) != '6' && str.charAt(6) != '7' && str.charAt(6) != '8') {
		if (temp == eval(str.charAt(12))) {
			return true;
		} else {
			return false;
		}
	} else {
		if ((temp + 2) % 10 == eval(str.charAt(12))) {
			return true;
		} else {
			return false;
		}
	}
	return false;
};

/**
 * 현재 일자를 반환
 *
 * @memberOf com
 * @author 
 * @return date
 * @example com.getCurrentServerDate(yyyyMMdd); com.getCurrentServerDate(yyyy); com.getCurrentServerDate(yyyyMM);
 *          yyyy 4자리 연도
 *          MM   2자리 달
 *          dd   2자리 일
 *          hh   2자리 시간
 *          mm   2자리 분
 *          ss   2자리 초
 */
com.getCurrentServerDate = function(dateFommat) {
	var today = "";
	var isActivePopupType = com.isBrowserPopup();

	if(isActivePopupType.type == "bp") {
		if(isActivePopupType.depth == 1) {
			today = $p.parent().$p.getCurrentServerDate( dateFommat );
		} else if(isActivePopupType.depth == 2) {
			today = $p.parent().$p.parent().$p.getCurrentServerDate(dateFommat);
		} else if(isActivePopupType.depth == 3) {
			today = $p.parent().$p.parent().$p.parent().$p.getCurrentServerDate(dateFommat);
		}
	} else {
		today = $p.getCurrentServerDate(dateFommat);
	}
	return today;
};


/**
 * 법인번호 유효성을 검사한다.
 *
 * @memberOf valLib
 * @param {String} str 문자열
 * @author InswaveSystems
 * @return {Boolean} true or false
 * @example
 * //올바르지 않은 번호일 경우
 * com.checkCorpNo("9701011234567");
 * //return 예시 )false
 *
 * //올바른 번호일 경우
 * com.checkCorpNo("9701011234567");
 * //return 예시 )true
 */
com.checkCorpNo = function(str) {
  if(com.length(str)!= 13) { return false; }

  var getlist  = Array(13);
  for (var i=0; i<13; i++) {
        getlist[i] = str.substring(i,1);  //substr(str,i, 1);
    }

  var sum = 0;
    sum += parseInt(getlist[0])*1;
    sum += parseInt(getlist[1])*2;
    sum += parseInt(getlist[2])*1;
    sum += parseInt(getlist[3])*2;
    sum += parseInt(getlist[4])*1;
    sum += parseInt(getlist[5])*2;
    sum += parseInt(getlist[6])*1;
    sum += parseInt(getlist[7])*2;
    sum += parseInt(getlist[8])*1;
    sum += parseInt(getlist[9])*2;
    sum += parseInt(getlist[10])*1;
    sum += parseInt(getlist[11])*2;

  var chkValue = 10 - (sum % 10);
  if(Number(chkValue) == 10) {
    chkValue = 0;
  }

  if( chkValue == getlist[12] ) {
    return true;
  }

  return false;
};

/**
 * 추가적으로 확장한 사용자 정의 유효성 검사를 수행한다.
 *
 * @param {Object} comObj 유효성 검증 대상 컴포넌트 객체
 * @memberOf valLib
 * @author InswaveSystems
 * @description
 * 1. isHangul
 * <br/>   - 한글 포함 여부 검사한다.
 * <br/>   - false : 한글이 포함되면 안됨
 * <br/>   - 컴포넌트 태그에 'isHangul'이라는 사용자 정의 속성을 추가한다.
 * <br/>   - ex) {xf:input id="ibx_AuthorityCd" mandatory="true" maxlength="5" minlength="5" isHangul="false"}{/xf:input}
 * <br/>
 * 2. isEmail
 * <br/>   - 이메일 유효성을 검사한다.
 * <br/>   - true : 입력받은 이메일 주소에 대한 검사를 수행한다.
 * <br/>   - 컴포넌트 태그에 'isEmail'이라는 사용자 정의 속성을 추가한다.
 * <br/>   - ex) {xf:input id="ibx_AuthorityCd" mandatory="true" maxlength="5" minlength="5" isEmail="true"}{/xf:input}
 * 3. isJumin
 * <br/>   - 주민번호 유효성을 검사한다.
 * <br/>   - true : 입력받은 주민번호에 대한 검사를 수행한다.
 * <br/>   - 컴포넌트 태그에 'isJumin'이라는 사용자 정의 속성을 추가한다.
 * <br/>   - ex) {xf:input id="ibx_AuthorityCd" mandatory="true" maxlength="5" minlength="5" isJummin="true"}{/xf:input}
 * 4. isCorpno
 * <br/>   - 법인번호 유효성을 검사한다.
 * <br/>   - true : 입력받은 법인번호에 대한 검사를 수행한다.
 * <br/>   - 컴포넌트 태그에 'isCorpno'이라는 사용자 정의 속성을 추가한다.
 * <br/>   - ex) {xf:input id="ibx_AuthorityCd" mandatory="true" maxlength="5" minlength="5" isCorpno="true"}{/xf:input}
 */
com.extendValidation = function(comObj) {
    var isHangul =  comObj.getUserData("isHangul");
    var isEnglish =  comObj.getUserData("isEnglish");
    var isEmail =  comObj.getUserData("isEmail");
    var isJumin =  comObj.getUserData("isJumin");
    var isCorpno =  comObj.getUserData("isCorpno");

    com.status.objectName = comObj.getID();
    var columnName = com.getColumnName(comObj);

    if (typeof isHangul !== "undefined") {
        if(isHangul === "true") {
          if (com.isKorean(comObj.getValue()) === false) {
            com.status.isValid = false;
            com.alert(columnName + "은(는) 한글만 입력가능합니다.");
            return false;
          }
        } else {
          if (com.isKorean(comObj.getValue()) === true) {
            com.status.isValid = false;
            com.alert(columnName + "은(는) 한글을 입력해서는 안됩니다.");
            return false;
          }
        }
    } else if (typeof isEnglish !== "undefined") {
        if(isEnglish === "true") {
          if (com.isEnglish(comObj.getValue()) === false) {
            com.status.isValid = false;
            com.alert(columnName + "은(는) 영문만 입력가능합니다.");
            return false;
          }
        } else {
          if (com.isEnglish(comObj.getValue()) === true) {
            com.status.isValid = false;
            com.alert(columnName + "은(는) 영문을 입력해서는 안됩니다.");
            return false;
          }
        }
    } else if ((typeof isEmail !== "undefined") && (isEmail === "true")) {
        if (com.isEmail(comObj.getValue()) === false) {
            com.status.isValid = false;
            com.alert(columnName + "은(는) 이메일 주소 형식이 올바르지 않습니다.",undefined, "com.groupValidationCallback");
            return false;
        }
    } else if ((typeof isJumin !== "undefined") && (isJumin === "true")) {
        if (com.checkPersonID(comObj.getValue()) === false) {
          com.status.isValid = false;
          com.alert(columnName + "은(는) 주민번호 형식이 올바르지 않습니다.",undefined, "com.groupValidationCallback");
          return false;
      }
    }else if ((typeof isCorpno !== "undefined") && (isCorpno === "true")) {
      if (com.checkCorpNo(comObj.getValue()) === false) {
        com.status.isValid = false;
        com.alert(columnName + "은(는) 법인번호 형식이 올바르지 않습니다.",undefined, "com.groupValidationCallback");
        return false;
    }
  }
};


// 푸터를 위한. 현재 윈도우를 찾는다.
com.getSelectedWindow = function(){
	var domActiveElement = document.activeElement;
	var isPopup = $p.top().$p.getComponentById(domActiveElement.id);
	var popupList = WebSquare.uiplugin.popup.popupList;
	const isActivePopupType = com.isBrowserPopup();
	if (popupList.length > 0) {
		for (var i = popupList.length - 1; i > -1; i--) {
			if (WebSquare.uiplugin.popup.popupList[i].options.modal) {
				isPopup = WebSquare.uiplugin.popup.popupList[i].popupWin;
			}
		}
	}
	var selWindowObj = null;
	if(isActivePopupType.type == 'np'){
		// 팝업 아닐 때
		selWindowObj = $p.top().wdc_main.getFrame($p.top().wdc_main.getSelectedWindowId());
	} else if (isPopup && popupList.length > 0) {
		// 팝업일 때
		selWindowObj = isPopup;
	} else if(isActivePopupType.type == 'bp') {
		// 브라우저 팝업일 때
		selWindowObj = null;
	}
	return selWindowObj;
};


/**
 * 빈값 체크 하는 함수 인듯
 * 2025-01-08 임시
 * */
com.IsExistVar = function(strVarID, bSearchAllFlag){
	//temp 상위는 어딜까?
	var retBool = false;

	var temp = $p.parent().scwin[strVarID];
	if ( temp == null || temp == undefined || temp == '' ) {
		if ( bSearchAllFlag ) {
			temp = $p.top().scwin[strVarID];
			if ( temp != null || temp != undefined || temp != '' ) {
				retBool = true;
			}
		}
	} else {
		retBool = true;
	}

	return retBool;
};

com.gfn_Logger = function(info) {
	com.alert("미사용");
	return false;
	//server의 log on/off 옵션 얻어와서 처리.
	/*
	if(gcm.G_ISLOCAL != "Y") { gcm.GV_LOGGER_FLAG = true; }
	
	console.log(gcm.G_ISLOCAL);
	console.log(gcm.GV_LOGGER_FLAG);
	
	if(gcm.GV_LOGGER_FLAG) {
		trace("#### USER TRACE ####");
		trace(info);
		trace("####################");
	}
	*/
};