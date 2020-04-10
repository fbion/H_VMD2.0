/******************************************************************
 ** 文件名:config.js 扩展动态加载组件设计模式配置
 ** Copyright (c) 2020 汉威公司技术研究院
 ** 创建人:马飞
 ** 日 期:2020/02/27
 ** 版 本:1.0
 *
 *
 ** 修改人:马飞
 ** 修改日 期:2020/02/27
 ** 描 述:
 ** 版 本:1.1
 ******************************************************************/
Ext.define('vmd.d.config',{
	singleton:true,
	requires:['vmd.base.UxPropertySettings','ide.ext.workflow',
	'ide.ext.Report', 'ide.ext.Chart', 'ide.ext.DataInput','ide.ext.Well','ide.ext.MiningIndex','ide.ext.IsoArea']
})
