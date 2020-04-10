/******************************************************************
 ** 文件名:viewmodel基类(组件与模型绑定关系)
 ** Copyright (c) 2020 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2020/02/27
 ** 版 本:1.0

 ******************************************************************/
Ext.define('vmd.base.ViewModel',{

	xtype:'vmd.base.viewmodel',
	constructor:function(scope){
		this.scope=scope
	},
	bind:function(props){
		this.props=props;
		
		//根据绑定关系进行组件赋值
		this.refresh();
	},

	refresh:function(){
		Ext.each(this.bindCmpList.keys,function(key){
			var cmp=this.bindCmpList.get(key);
			var val='';
			if(cmp&&cmp.setValue){
				try{
					val=eval('this.props.'+key)
				}catch(ex){}
				cmp.setValue(val);
			}else{
				console.log(cmp.id+'未实现setvalue方法，无法进行赋值！')
			}
		},this)
		
	},
	set:function(bindvalue,newValue){
		//动态赋值
		if(bindvalue){
			
			if(Ext.isObject(newValue)){
				
				eval('Ext.apply(this.props.'+bindvalue+',newValue)');
			}else{
				eval('this.props.' + bindvalue + '=newValue');
			}
		}
	},
	each:function(callback){
		var me=this;
		var scope=this.scope;
		scope.cascade(function(cmp){
			 if(scope.id==cmp.id) return true;
			 callback&&callback(cmp,me);
			 return cmp.xtype.indexOf('vmd.ux')==-1?true:false
		},scope)
	},
	_getValue:function(cmp,val){
		
		switch(cmp.xtype){
			case 'radiostoregroup':
			  val=cmp.getValue();
			  break;
			case "datefield":
			  val=cmp.getValue(true);
			  break;
		}
		return val;			
		
	},
	addObserver:function(){
		var me=this;
		var scope=this.scope;
	
		/*scope.cascade(function(cmp){
		  if(scope.id==cmp.id) return true;
		 
			 cmp.on('change', function(sender, newValue, oldValue) {
					me.onValueChange(sender, newValue, {scope:me.scope,props:me.props})
				})
			cmp.on("check", function(sender, newValue, oldValue) {
				me.onValueChange(sender, newValue, {scope:me.scope,props:me.props})
				})
			cmp.on("select", function(sender, newValue, oldValue) {
                  me.onValueChange(sender, newValue, {scope:me.scope,props:me.props})
               })
			  
			  return cmp.xtype.indexOf('vmd.ux')==-1?true:false
		
	  },scope)*/
	   this.bindCmpList=new Ext.util.MixedCollection();
        
	   this.each(function(cmp){
		   
		   //事件监听
		   cmp.on('change', function(sender, newValue, oldValue) {
			       
					var val=me._getValue(sender,newValue)
					
					me.onValueChange(sender, val, {scope:me.scope,props:me.props})
			})
			
			cmp.on("check", function(sender, newValue, oldValue) {
				me.onValueChange(sender, newValue, {scope:me.scope,props:me.props})
			})
			/*cmp.on("select", function(sender, newValue, oldValue) {
                  me.onValueChange(sender, newValue, {scope:me.scope,props:me.props})
             })*/
			 
			 if(cmp.BindValue) me.bindCmpList.add(cmp.BindValue,cmp);
			 
	   })
	},
	onValueChange:function(){
		
	}
	
})
