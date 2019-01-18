<template>
  <div class="app-container">
    <el-row>
      <el-col :span="23">
        <div class="tableListTitle2" style="margin-top:5px;">
          <label id="proName">{{projectName}}</label>
        </div>
      </el-col>
      <el-col :span="1">
        <el-button id="backButton" @click="getBack" style="margin-bottom:5px;" size="mini" type="primary" icon="el-icon-caret-left">返回</el-button>
      </el-col>
    </el-row>
    <el-card shadow="never" v-loading="loading">
      <!-- 搜索栏 -->
      <el-tabs v-model="activeName" :before-leave="beforeClick">
        <el-tab-pane class="chartsPanel" label="工程概况" name="first-ta">
          <!-- 项目当前信息 / -->
          <el-form id="projectForm" style="height:100%;overflow:auto;" ref="formBase">
            <input id="formUrl" type="hidden">
            <input id="projectUuid" type="hidden">
            <table id="tableHeader" cellpadding="0" cellspacing="0">
              <tr>
                <th id="tableName">
                  工程概况
                </th>
              </tr>
            </table>
            <table class="tableEditDetail" style="height:45%;" cellpadding="0" cellspacing="1">
              <tr>
                <th style="width: 15%;">
                  工程编号
                </th>
                <td style="width: 35%">
                  <input name="code" rows="2" cols="20" class="input" id="projectCode" style="height:30px;width:80%;"></input>
                </td>
                <th style="width: 15%">
                  监督编号
                </th>
                <td>
                  <input name="superviseCode" rows="2" cols="20" class="input" id="superviseCode" style="height:30px;width:80%;"></input>
                </td>
              </tr>
              <tr>
                <th style="width: 15%">
                  工程名称
                </th>
                <td>
                  <input name="projectName" rows="2" cols="20" id="projectName" class="input" style="height:30px;width:80%;" required></input>
                  <label style="color:red">*</label>
                </td>
                <th>
                  工程地址
                </th>
                <td>
                  <input name="address" rows="2" cols="20" id="projectLocation" class="input" style="height:30px;width:80%;" required></input>
                  <input type="hidden" name="" id="" />
                  <input type="hidden" name="" id="" />
                </td>
              </tr>
              <tr>
                <th>
                  所属区域
                </th>
                <td>
                  <input name="projectRegion" id="projectRegion" class="easyui-combobox" data-options="valueField: 'value',textField: 'label'" style="width:80%;height:30px;" />
                </td>
                <th>
                  经纬度
                </th>
                <td>
                  <input name="lon" maxlength="20" v-model="location" type="text" id="projectLatLon" class="input" style="width:30%;" disabled="true " />
                  <input type="button" @click="selectLonlat" data-toggle="modal" id="lonlatSelect" class="btton85" value="获取经纬度" />
                  <label style="color:red">(*请选择位置)</label>
                </td>
              </tr>
              <tr>
                <th>
                  支护形式
                </th>
                <td>
                  <input name="structure" rows="2" cols="20" id="supportingStructure" class="input" style="height:30px;width:80%;"></input>
                </td>
                <th>
                  安全等级
                </th>
                <td>
                  <el-select v-model="formBase.safetyClass" placeholder="请选择">
                    <el-option id="safetyClass" v-for="item in safetyOption" :key="item.classCode" :label="item.className" :value="item.classCode" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <th>
                  基坑设计深度
                </th>
                <td>
                  <input name="deep" rows="2" cols="20" id="foundationDepth" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
                <th>
                  基坑周长:
                </th>
                <td>
                  <input name="perimeter" rows="2" cols="20" id="foundationPerimeter" class="input" style="height:30px;width:80%;"></input>(M)
                </td>
              </tr>
              <tr>
                <th>
                  计划开挖时间
                </th>
                <td>
                  <input name="deep" rows="2" cols="20" id="excavationDatePlaned" class="input" style="height:30px;width:80%;"></input>(yyyy/mm/dd)
                </td>
                <th>
                  计划回填时间
                </th>
                <td>
                  <input name="perimeter" rows="2" cols="20" id="backfillDatePlaned" class="input" style="height:30px;width:80%;"></input>(yyyy/mm/dd)
                </td>
              </tr>
              <tr>
                <th>
                  实际开挖时间
                </th>
                <td>
                  <input name="deep" rows="2" cols="20" id="excavationDateActual" class="input" style="height:30px;width:80%;"></input>(yyyy/mm/dd)
                </td>
                <th>
                  实际回填时间
                </th>
                <td>
                  <input name="perimeter" rows="2" cols="20" id="backfillDateActual" class="input" style="height:30px;width:80%;"></input>(yyyy/mm/dd)
                </td>
              </tr>
              <tr>
                <th>
                  施工工况
                </th>
                <td>
                  <el-select v-model="formBase.constructionStep" placeholder="请选择">
                    <el-option id="constructionStep" v-for="item in stepOption" :key="item.stepCode" :label="item.stepName" :value="item.stepCode" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </td>
                <th>
                  项目状态
                </th>
                <td>
                  <el-select v-model="formBase.constructionState" placeholder="请选择">
                    <el-option id="constructionState" v-for="item in stateOption" :key="item.stateCode" :label="item.stateName" :value="item.stateCode" :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </td>
              </tr>
              <tr>
                <th>
                  监测单位
                </th>
                <td>
                  <input name="monitorLeader" type="text" id="monitoringOrg" class="input" style="width:40%;height:30px;" />
                </td>
                <th>
                  监测负责人
                </th>
                <td>
                  <input name="monitorWorker" type="text" id="monitoringHead" class="input" style="width:60%;height:30px;" disabled="true " />
                  <el-button id="addMonitorWorker" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                  <el-button id="deleteMonitorWorker" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                </td>
              </tr>
              <tr>
                <th>
                  监测人员
                </th>
                <td>
                  <input name="monitorWorker" type="text" id="monitoringSurveyor" class="input" style="width:60%;height:30px;" disabled="true " />
                  <el-button id="addMonitorWorker" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                  <el-button id="deleteMonitorWorker" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                </td>
                <th>
                  行政主管部门
                </th>
                <td colspan="1">
                  <input name="superviseWorker" rows="2" cols="20" id="admDepartment" class="input" style="height:30px;width:80%;"></input>
                </td>
              </tr>
              <tr>
                <th>
                  监督单位
                </th>
                <td>
                  <input name="superviseCompany" rows="2" cols="20" id="supervisorOrg" class="input" style="height:30px;width:80%;"></input>
                </td>
                <th>
                  监督人员
                </th>
                <td>
                  <input name="superviseCompany" rows="2" cols="20" id="supervisorLinkman" class="input" style="height:30px;width:80%;"></input>
                </td>
              </tr>
              <tr>
                <th>
                  项目创建人
                </th>
                <td>
                  <input name="superviseCompany" rows="2" cols="20" id="createAccUuid" class="input" style="height:30px;width:80%;"></input>
                </td>
                <th>
                </th>
                <td colspan="1">
                </td>
              </tr>
              <tr>
                <th>
                  项目创建时间
                </th>
                <td colspan="1">
                  <el-date-picker id="createDate" v-model="formBase.createDate" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
                  </el-date-picker>
                </td>
                <th>
                  项目结束时间
                </th>
                <td>
                  <el-date-picker id="finishDate" v-model="formBase.finishDate" type="datetime" placeholder="选择日期时间" default-time="12:00:00">
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <th>
                  工程概况描述
                </th>
                <td colspan="3">
                  <textarea name="projectDetail" rows="2" cols="20" id="projectDetail" class="input" style="height:85px;line-height:85px;width:95%;"></textarea>
                </td>
              </tr>
            </table>
            <table class="tableEditDetail" id="projectInfo1" cellpadding="0" cellspacing="1" style="margin-top: -1px;height:41%;">
              <tr>
                <th style="width: 15%;">
                  建设单位
                </th>
                <td style="width: 35%;">
                  <textarea name="buildCompany" rows="2" cols="20" id="proprietorOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="proprietorLinkman" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addBuildName" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteBuildName" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th style="width: 15%;">
                  设计单位
                </th>
                <td style="width: 35%;">
                  <textarea name="designCompany" rows="2" cols="20" id="designOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="designLinkman" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addDesign" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteDesign" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th style="width: 15%;">
                  施工单位
                </th>
                <td style="width: 35%;">
                  <textarea name="constructCompany" rows="2" cols="20" id="constructionOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1">
                    <tr>
                      <th style="width: 25%; background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="constructionLinkman" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addMonitorLeader" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteMonitorLeader" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th style="width: 15%;">
                  监理单位
                </th>
                <td style="width: 35%;">
                  <textarea name="supervisorCompany" rows="2" cols="20" id="supervisionOrg" class="input" style="height:55px;width:80%;"></textarea>
                </td>
                <td style="width: 50%;">
                  <table class="tableEditDetail" cellpadding="0" cellspacing="1" width="100%">
                    <tr>
                      <th style="width: 25%;background-color: #fff2ec;">
                        联系人
                      </th>
                      <td style="width: 40%">
                        <label id="supervisionLinkman" class="input" style="width:99%;"></label>
                      </td>
                      <td style="width: 26%;text-align:center;">
                        <el-button id="addMonitorLeader" size="mini" type="primary" icon="el-icon-circle-plus">添加</el-button>
                        <el-button id="deleteMonitorLeader" size="mini" type="danger" icon="el-icon-circle-close">删除</el-button>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <th colspan="3">
                  <el-button id="saveBtn" @click="saveProject" type="success" size="mini" icon="el-icon-check">
                    <strong>
                      <i class="glyphicon glyphicon-ok"></i>&nbsp提交</strong>
                  </el-button>
                  <el-button type="info" size="mini" id="cancelBtn" icon="el-icon-delete" data-dismiss="modal">
                    <strong>
                      <i class="glyphicon glyphicon-remove"></i>&nbsp重置</strong>
                  </el-button>
                </th>
              </tr>
            </table>
          </el-form>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="监测方案" name="second-ta">
          <table class="tableEditDetail" cellpadding="0" cellspacing="1">
            <tr>
              <th colspan="1" style="background-color: #fff2ec;">
                <label>方案类别</label>
              </th>
              <th colspan="1" style="background-color: #fff2ec;">
                <label>操作(支持批量上传文件)</label>
              </th>
            </tr>
            <tr>
              <th class="fieldLabel" colspan="1">
                <label style="font-weight:normal;">方案审批表:</label>
              </th>
              <th colspan="1">
                <el-button size="mini" type="primary" @click="getLoadFile('1')">附件上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <form enctype="multipart/form-data" id="form_example" style="display:none">
                  <input type="file" name="files" id="approvalUpload" @change="addFiles('方案审批表','approvalUpload')" multiple/><br/><br/>
                </form>
              </th>
            </tr>
            <tr>
              <th class="fieldLabel" colspan="1">
                <label style="font-weight:normal;">基坑监测方案:</label>
              </th>
              <th colspan="1">
                <el-button size="mini" type="primary" @click="getLoadFile('2')">附件上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <form enctype="multipart/form-data" id="form_example" style="display:none">
                  <input type="file" name="files" id="filesUpload" @change="addFiles('基坑监测方案','filesUpload')" multiple/><br/><br/>
                </form>
              </th>
            </tr>
            <tr>
              <th class="fieldLabel" colspan="1">
                <label style="font-weight:normal;">其他相关文件:</label>
              </th>
              <th colspan="1">
                <el-button size="mini" type="primary" @click="getLoadFile('3')">附件上传
                  <i class="el-icon-upload el-icon--right"></i>
                </el-button>
                <form enctype="multipart/form-data" id="form_example" style="display:none">
                  <input type="file" name="files" id="othersUpload" @change="addFiles('其他相关文件','othersUpload')" multiple/><br/><br/>
                </form>
              </th>
              </td>
            </tr>
          </table>
          <el-table :data="approvalList" v-loading="fileLoading" :header-cell-style="tableHeaderStyle" element-loading-text="给我一点时间" :height="secondHeight" fit highlight-current-row style="width: 100%" border>
            <el-table-column align="center" label="方案名称">
              <template slot-scope="scope">
                <span v-if="scope.row.fileName!=null">{{ scope.row.fileName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="方案类别">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.fileType === '方案审批表'" type="success" disable-transitions>{{scope.row.fileType}}</el-tag>
                <el-tag v-if="scope.row.fileType === '基坑监测方案'" type="primary" disable-transitions>{{scope.row.fileType}}</el-tag>
                <el-tag v-if="scope.row.fileType === '其他相关文件'" type="warning" disable-transitions>{{scope.row.fileType}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')" width="200px" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="uploadFile(scope.row.progUuid)" icon="el-icon-download">下载
                </el-button>
                <el-button size="mini" type="danger" @click="removeFile(scope.row.progUuid)" icon="el-icon-delete">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="监测平面图" name="third-ta">
          <table class="tableEditDetail" cellpadding="0" cellspacing="1">
            <tr>
              <th class="fieldLabel" colspan="1">
                <label>监测平面图:</label>
              </th>
              <th colspan="2">
                <el-form :model="form">
                  <el-form-item>
                    <el-upload style="height:150px;" :on-change="onUploadChange" ref="upload" action="#" :file-list="picFiles" accept="image/png,image/gif,image/jpg,image/jpeg" list-type="picture-card" :limit="limitNum" :auto-upload="false" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" height="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                  </el-form-item>
                </el-form>
              </th>
            </tr>
          </table>
          <el-table :data="picShowList" v-loading="fileLoading" :header-cell-style="tableHeaderStyle" element-loading-text="给我一点时间" :height="thirdHeight" fit highlight-current-row style="width: 100%" border>
            <el-table-column align="center" label="平面图名称">
              <template slot-scope="scope">
                <span v-if="scope.row.fileName!=null">{{ scope.row.fileName }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')" width="200px" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="uploadFile(scope.row.progUuid)" icon="el-icon-download">下载
                </el-button>
                <el-button size="mini" type="danger" @click="removeFile(scope.row.progUuid)" icon="el-icon-delete">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="监测项设置" name="fouth-ta">
          <el-button id="addFdButton" @click="addFdSetting" style="margin-bottom:5px;" size="mini" type="success" icon="el-icon-circle-plus-outline">新增</el-button>
          <el-table :data="items" v-loading="listLoading" element-loading-text="给我一点时间" fit highlight-current-row style="width: 100%" border>
            <el-table-column align="center" label="监测项名称">
              <template slot-scope="scope">
                <span v-if="scope.row.mItemName!=null">{{scope.row.mItemName}}</span>
                <span v-if="scope.row.mItemName==null">/</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="报警设置">
              <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-warning" @click="warningClick(scope.row.monitorItemUuid)" size="small">报警设置</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="断面设置">
              <template slot-scope="scope">
                <span v-if="scope.row.mItemName=='围护墙（边坡）顶部水平位移'">
                  <el-button type="success" icon="el-icon-news" @click="sectionClick(scope.row.monitorItemUuid)" size="small">断面设置</el-button>
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="采集模式">
              <template slot-scope="scope">
                <span v-if="scope.row.mItemMode=0">手动采集</span>
                <span v-if="scope.row.mItemMode=1">自动采集</span>
              </template>
            </el-table-column>
            <!-- 头像 -->
            <el-table-column align="center" label="测点设置">
              <template slot-scope="scope">
                <el-button type="warning" icon="el-icon-location-outline" @click="surveypointClick(scope.row.monitorItemUuid)" size="small">测点设置</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" label="监测频率">
              <template slot-scope="scope">
                <span v-if="scope.row.mItemFrequency!=null">{{scope.row.mItemFrequency+"天/次"}}</span>
                <span v-if="scope.row.mItemFrequency==null">/</span>
              </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('table.actions')" width="150px" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button :disabled="scope.row.is_deleted===1" size="mini" type="success" @click="updateFd(scope.row)">修改</el-button>
                <el-button :disabled="scope.row.is_deleted===1" size="mini" type="danger" @click="removeFd(scope.row.monitorItemUuid)">{{$t('table.delete')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane class="chartsPanel" label="自动化设置" name="fifth-ta">
          <span style="font-size:60px;color:blue;">
            尚在开发中！！</span>
        </el-tab-pane>
      </el-tabs>
      <mu-dialog :open="dialogAdd" dialogClass="location-add-dialog" @close="closeAddLocation" @show="initMap">
        <div class="dialog-title">
          标注经纬度
          <i class="material-icons close-icon" @click="closeAddLocation">X</i>
        </div>
        <div class="dialog-content">
          <div class="clearfix">
            <div class="left-form">
              <div class="form-group">
                <label class="control-label">工程地址</label>
                <input type="text" id="tipinput" class="form-control" v-model="addData.rtmp" placeholder="工程地址" autocomplete="off">
              </div>
              <div class="form-group">
                <label class="control-label">经纬度</label>
                <input type="text" class="form-control half" v-model="addData.lng" placeholder="经度" autocomplete="off" style="margin-right: 30px">
                <input type="text" class="form-control half" v-model="addData.lat" placeholder="纬度" autocomplete="off">
              </div>
            </div>
            <div class="right-map">
              <div class="map-parent">
                <div id="map"></div>
              </div>
              <div>按住左键拖动地图上红色标注到相应位置，即可完成经纬度标注，并自动获取该地址</div>
            </div>
          </div>
        </div>
      </mu-dialog>
      <!-- 新增修改监测项设置弹窗 -->
      <component @refreshFdList="getFdSetList" :itemDropdownList="itemDropdownList" :sectionDropdownList="sectionDropdownList" :projectId="projectId" v-bind:is="FdSettingAdd" ref="editFd" :text='text' :pageTitle='pageTitle' :formBase='formData' :ruleInline='ruleInline' v-on:handleCloseFd="handleCloseFd">
      </component>
      <!-- 报警设置窗口-->
      <component v-bind:is="WarningSet" :projectId="projectId" ref="warningModel" v-on:handleCloseWarning="handleCloseWarning">
      </component>
      <!-- 断面设置窗口-->
      <component v-bind:is="SectionSet" :projectId="projectId" ref="sectionModel" v-on:handleCloseSection="handleCloseSection">
      </component>
      <!-- 监测点设置窗口 -->
      <component v-bind:is="SurveypointSet" :projectId="projectId" ref="surveypointModel" v-on:handleCloseSurveypoint="handleCloseSurveypoint">
      </component>
    </el-card>
  </div>
</template>

<script>
import {
  projectAdd,
  projectUpdate,
  getSafety,
  getStep,
  getState,
  getFdSet,
  getMonitor,
  getSectionSet,
  removeFdSet,
  getFileList,
  deleteFile,
  downFile,
  addProjectPic,
  getProjectPic
} from "@/api/base/project";
import { detail } from "@/api/base/organ";
import echarts from "echarts";
import FdSettingAdd from "./../components/fdSettingAdd";
import WarningSet from "./../components/warningSet.vue";
import SectionSet from "./../components/sectionSet.vue";
import SurveypointSet from "./../components/surveypointSet.vue";
import { debounce } from "@/utils";
import { getToken } from "@/utils/auth";
import axios from "axios";
require("echarts/theme/macarons"); // echarts theme

/* eslint-disable no-undef */
const mapConfig = {
  center: [113.310846, 22.961402],
  zoom: 9,
  zooms: [3, 18]
};
export default {
  name: "datachart-table-index",
  components: {
    FdSettingAdd,
    WarningSet,
    SectionSet,
    SurveypointSet
  },
  data() {
    return {
      projectName: "",
      createUuid: "", //当前登陆人的id
      dialogImageUrl: "",
      dialogVisible: false,
      limitNum: 5,
      picFiles: [], //图片预览
      form: {}, //图片上传相关
      secondHeight: window.innerHeight - 350, //table高度
      thirdHeight: window.innerHeight - 370, //平面图table高度
      fileList: [], //上传的文件列表流
      picList: [], //上传的工程图流
      fileType: "", //上传文件类别
      approvalList: [], //拿到该项目下所有方案的列表
      picShowList: [], //该项目下所有预览的图片
      FdSettingAdd: "FdSettingAdd",
      WarningSet: "WarningSet",
      SectionSet: "SectionSet",
      SurveypointSet: "SurveypointSet",
      text: "",
      pageTitle: "",
      type: null, //新增还是修改项目的判断值
      activeName: "first-ta", //切换tab的值
      projectId: "", //判断是否有projectUuid来进入下几个tab，如果projectuuid没有值，则必须新建项目
      dialogAdd: false,
      addData: {
        location_id: "", // 以萨卡口编号
        loc_id: "", // 厂商卡口编号
        text: "", // 点位名称
        lng: "", // 经度
        lat: "", // 纬度
        rtmp: "" // rtmp地址或rtsp地址
      },
      location: "",
      iconUrl: "./../static/images/map/",
      size: new AMap.Size(17, 23),
      offset: new AMap.Pixel(-8, -23),
      options: {
        center: new AMap.LngLat(mapConfig.center[0], mapConfig.center[1]),
        zoom: mapConfig.zoom,
        zooms: mapConfig.zooms,
        animateEnable: true
      },
      filters: {
        column: {
          create_start_date: "",
          create_end_date: ""
        }
      },
      itemDropdownList: [], //新增监测项时的监测项下拉列表
      sectionDropdownList: [], //断面设置的下拉列表
      dialogImageUrl: "",
      dialogVisible: false,
      pickerBeginDateBefore: {
        disabledDate: time => {
          let beginDateVal = this.filters.column.create_end_date;
          if (beginDateVal) {
            return time.getTime() > beginDateVal;
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: time => {
          let beginDateVal = this.filters.column.create_start_date;
          if (beginDateVal) {
            return time.getTime() < beginDateVal;
          }
        }
      },
      listLoading: true,
      fileLoading: true,
      formSearch: {
        user: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        state: ""
      },
      barSearch: {
        expandInputs: false,
        expandBtnText: "",
        alertText: ""
      },
      items: [],
      pagination: {
        total: 0,
        pageSize: 20,
        pageSizes: [20, 50, 80, 120],
        currentPage: 1
      },
      formBase: [],
      loading: false,
      multipleSelection: [],
      dialogVisible: false,
      formData: {
        monitorItemUuid: "",
        projectUuid: this.projectId,
        mItemName: "",
        mItemEname: "",
        mItemDevices: "",
        mItemFrequency: "",
        mItemMode: "",
        sectionUuid: "",
        mItemOrder: "",
        mItemValid: ""
      },
      projectInfo: [],
      token: getToken(),
      safetyOption: [],
      stepOption: [],
      stateOption: [],
      ruleInline: {
        // 表单验证
        mItemName: [
          { required: true, message: "监测项名称不能为空", trigger: "blur" }
        ],
        mItemMode: [
          { required: true, message: "采集模式不能为空", trigger: "blur" }
        ],
        mItemValid: [
          { required: true, message: "有效状态不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //获取当前登录人的信息
    getDetil() {
      detail({ token: this.token }).then(res => {
        this.createUuid = res.data.userUuid;
      });
    },
    //获取可下载文件的列表
    getAllFile() {
      getFileList({ projectUuid: this.projectId, token: this.token }).then(
        res => {
          this.approvalList = res.data.data;
          this.fileLoading = false;
        }
      );
    },
    getAllPic() {
      getProjectPic({ projectUuid: this.projectId, token: this.token }).then(
        res => {
          debugger;
          this.picShowList = res.data.data;
          this.fileLoading = false;
          var name; //图片名字
          var url; //图片地址
          this.picFiles = [];
          // 图片预览数组
          for (var i = 0; i < res.data.data.length; i++) {
            name = res.data.data[i].fileName;
            url = "static/" + res.data.data[i].projectUuid + "/" + name;
            this.picFiles.push({ name: name, url: url });
          }
        }
      );
    },
    //删除附件
    removeFile(progUuid) {
      this.$confirm("此操作将永久删除该文件" + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          deleteFile({ progUuid, token: this.token })
            .then(response => {
              debugger;
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getAllFile();
                this.getAllPic();
              } else {
                this.$message({
                  type: "warning",
                  message: response.data.message
                });
              }
            })
            .catch(response => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    //附件上传
    addFiles(fileType, fileInputId) {
      debugger;
      //拿到全局vue的指向
      var _this = this;
      var files = document.getElementById(fileInputId);
      this.fileList = [];
      this.fileType = fileType;
      for (var i = 0; i < files.files.length; i++) {
        this.fileList.push(files.files[i]);
      }
      var formData = new FormData();
      // var request = new XMLHttpRequest();
      //循环添加到formData中
      this.fileList.forEach(function(file) {
        formData.append("files", file, file.name);
      });
      formData.append("fileType", this.fileType);
      formData.append("projectUuid", this.projectId);
      formData.append("token", this.token);
      $.ajax({
        url: "/api/Foundation/programme/add.data",
        type: "POST",
        data: formData,
        cache: false, //不设置缓存
        processData: false, // 不处理数据
        contentType: false, // 不设置内容类型
        dataType: "json",
        success: function(res) {
          if (res.result == 1) {
            _this.$confirm(res.message, "提示", {
              type: "success",
              showConfirmButton: false,
              showCancelButton: false
            });
            _this.getAllFile();
          } else {
            _this.$confirm(res.message, "提示", {
              type: "danger",
              showConfirmButton: false,
              showCancelButton: false
            });
          }
        },
        error: function(res) {
          alert("上传失败!无法获取上传接口");
        }
      });
    },
    //下载文件
    uploadFile(progUuid) {
      downFile({ progUuid: progUuid, token: this.token }).then(res => {
        debugger;
        let url = res.data.data;
        var i = url.indexOf("static");
        url = url.substring(i, url.length);
        let link = document.createElement("a");
        document.body.appendChild(link);
        link.style.display = "none";
        link.href = url;
        link.click();
      });
    },
    //平面图上传
    onUploadChange() {
      debugger;
      //拿到全局vue的指向
      var _this = this;
      var fileValue = document.querySelector(".el-upload .el-upload__input");
      this.picList = [];
      for (var i = 0; i < fileValue.files.length; i++) {
        this.picList.push(fileValue.files[i]);
      }
      var formData = new FormData();
      // var request = new XMLHttpRequest();
      //循环添加到formData中
      this.picList.forEach(function(file) {
        formData.append("files", file, file.name);
      });
      formData.append("projectUuid", this.projectId);
      formData.append("token", this.token);
      $.ajax({
        url: "/api/Foundation/plan/add",
        type: "POST",
        data: formData,
        cache: false, //不设置缓存
        processData: false, // 不处理数据
        contentType: false, // 不设置内容类型
        dataType: "json",
        success: function(res) {
          if (res.result == 1) {
            _this.$confirm(res.message, "提示", {
              type: "success",
              showConfirmButton: false,
              showCancelButton: false
            });
            _this.getAllFile();
          } else {
            _this.$confirm(res.message, "提示", {
              type: "danger",
              showConfirmButton: false,
              showCancelButton: false
            });
          }
        },
        error: function(res) {
          alert("上传失败!无法获取上传接口");
        }
      });
      // var reader = new FileReader();
      // reader.readAsDataURL(file.raw);
      // reader.onload = function(e) {
      //   console.log(this.result); //图片的base64数据
      // };
    },
    initMap() {
      let _this = this;
      let marker = null;
      _this.map = new AMap.Map("map", _this.options);
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function() {
        _this.map.addControl(new AMap.ToolBar());
        _this.map.addControl(new AMap.Scale());
      });
      // if (_this.addData.lng && _this.addData.lat) {
      //   let lnglat = new AMap.LngLat(parseFloat(_this.addData.lng), parseFloat(_this.addData.lat))
      //   _this.map.setCenter(lnglat)
      //   marker = _this.addMarkerOne(parseFloat(_this.addData.lng), parseFloat(_this.addData.lat))
      // } else {
      marker = _this.addMarkerOne(
        parseFloat(mapConfig.center[0]),
        parseFloat(mapConfig.center[1])
      );
      // }
      marker.on("dragend", function(e) {
        _this.addData.lng = e.lnglat.lng;
        _this.addData.lat = e.lnglat.lat;
        _this.location = e.lnglat.lng + "," + e.lnglat.lat;
      });
      //输入提示
      var autoOptions = {
        input: "tipinput"
      };
      var auto = new AMap.Autocomplete(autoOptions);
      var placeSearch = new AMap.PlaceSearch({
        map: _this.map
      }); //构造地点查询类
      AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
      function select(e) {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name); //关键字查询查询
      }
    },
    closeAddLocation() {
      this.dialogAdd = false;
    },
    changeLocation() {
      this.dialogAdd = false;
    },
    addMarkerOne(lng, lat) {
      let marker = null;
      if (this.map) {
        let lnglat = new AMap.LngLat(parseFloat(lng), parseFloat(lat));
        if (lnglat) {
          let opts = {
            map: this.map,
            position: lnglat,
            icon: new AMap.Icon({
              image: this.iconUrl + "stop-markerh.png",
              size: this.size
            }),
            offset: this.offset,
            draggable: true
          };
          marker = new AMap.Marker(opts);
        }
      }
      return marker;
    },
    saveProject() {
      debugger;
      var projectParams = new Object();
      var projectData = new Object();
      projectParams.token = this.token;
      projectParams.data = projectData;
      projectData.projectUuid = this.projectId;
      projectData.projectCode = $("#projectCode").val();
      projectData.superviseCode = $("#superviseCode").val();
      projectData.projectName = $("#projectName").val();
      projectData.projectLocation = $("#projectLocation").val();
      projectData.projectLatLon = $("#projectLatLon").val();
      projectData.projectRegion = $("#projectRegion").val();
      projectData.supportingStructure = $("#supportingStructure").val();
      projectData.safetyClass = $("#safetyClass").val();
      projectData.foundationDepth =
        $("#foundationDepth").val() != ""
          ? $("#foundationDepth").val() * 1
          : null;
      projectData.foundationPerimeter =
        $("#foundationPerimeter").val() != ""
          ? $("#foundationPerimeter").val() * 1
          : null;
      projectData.excavationDatePlaned = $("#excavationDatePlaned").val();
      projectData.backfillDatePlaned = $("#backfillDatePlaned").val();
      projectData.excavationDateActual = $("#excavationDateActual").val();
      projectData.backfillDateActual = $("#backfillDateActual").val();
      projectData.constructionStep = $("#constructionStep").val();
      projectData.constructionState = $("#constructionState").val();
      projectData.monitoringOrg = $("#monitoringOrg").val();
      projectData.monitoringHead = $("#monitoringHead").val();
      projectData.monitoringSurveyor = $("#monitoringSurveyor").val();
      projectData.supervisorOrg = $("#supervisorOrg").val();
      projectData.supervisorLinkman = $("#supervisorLinkman").val();
      projectData.proprietorOrg = $("#proprietorOrg").val();
      projectData.proprietorLinkman = $("#proprietorLinkman").val();
      projectData.designOrg = $("#designOrg").val();
      projectData.designLinkman = $("#designLinkman").val();
      projectData.constructionOrg = $("#constructionOrg").val();
      projectData.constructionLinkman = $("#constructionLinkman").val();
      projectData.supervisionOrg = $("#supervisionOrg").val();
      projectData.supervisionLinkman = $("#supervisionLinkman").val();
      projectData.admDepartment = $("#admDepartment").val();
      projectData.createDate = $("#createDate").val();
      projectData.createAccUuid = this.createUuid;
      projectData.finishDate = $("#finishDate").val();
      projectData.foundationLayout = ""; //平面图
      projectData.projectDetail = $("#projectDetail").val();
      if (this.type == "新增") {
        projectAdd(projectParams)
          .then(response => {
            if (response.data.result == 1) {
              const jsonData = response.data;
              this.projectId = jsonData.data.projectUuid;
              // this.projectInfo=jsonData.data;
              this.$confirm("创建工程成功!", "提示", {
                type: "success",
                showConfirmButton: false,
                showCancelButton: false
              });
              //编辑成功后跳转到工程列表
              this.$router.push({ path: "itemList" });
            } else {
              this.$confirm(response.data.message, "提示", {
                type: "error",
                showConfirmButton: false,
                showCancelButton: false
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "无法获取创建接口!"
            });
          });
      } else if (this.type == "修改") {
        projectUpdate(projectParams)
          .then(response => {
            if (response.data.result == 1) {
              const jsonData = response.data;
              this.$confirm("修改工程成功!", "提示", {
                type: "success",
                showConfirmButton: false,
                showCancelButton: false
              });
            } else {
              this.$confirm(response.data.message, "提示", {
                type: "error",
                showConfirmButton: false,
                showCancelButton: false
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "无法获取修改接口!"
            });
          });
      }
    },
    selectLonlat() {
      debugger;
      this.dialogAdd = true;
    },
    //在监测项设置
    addFdSetting() {
      this.text = "创建";
      this.pageTitle = "监测项";
      //获取监测项下拉表
      getMonitor().then(res => {
        this.itemDropdownList = res.data;
      });
      //获取断面设置列表
      getSectionSet({ token: this.token, projectUuid: this.projectId }).then(
        res => {
          // debugger;
          this.sectionDropdownList = res.data.data;
        }
      );
      this.$refs.editFd.dialogFormV();
    },
    updateFd(params) {
      this.text = "修改";
      this.pageTitle = "监测项";
      //获取监测项下拉表
      getMonitor().then(res => {
        this.itemDropdownList = res.data;
      });
      //获取断面设置列表
      getSectionSet({ token: this.token, projectUuid: this.projectId }).then(
        res => {
          // debugger;
          this.sectionDropdownList = res.data.data;
        }
      );
      this.formData.monitorItemUuid = params.monitorItemUuid;
      this.formData.projectUuid = params.projectFoundationDitch.projectUuid;
      this.formData.mItemName = params.mItemName;
      this.formData.mItemEname = params.mItemEname;
      this.formData.mItemDevices = params.mItemDevices;
      this.formData.mItemFrequency = params.mItemFrequency;
      this.formData.mItemMode = params.mItemMode;
      this.formData.sectionUuid = params.sectionUuid;
      this.formData.mItemOrder = params.mItemOrder;
      this.formData.mItemValid = params.mItemValid;
      this.$refs.editFd.dialogFormV();
    },
    getLoadFile(type) {
      if (type == "1") {
        $("#approvalUpload").trigger("click");
      } else if (type == "2") {
        $("#filesUpload").trigger("click");
      } else if (type == "3") {
        $("#othersUpload").trigger("click");
      }
    },
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      debugger;
      // 获取当前网址，如： http://localhost:8080/Tmall/index.jsp
      var curWwwPath = window.document.location.href;
      // 获取主机地址之后的目录如：/Tmall/index.jsp
      var pathName = window.document.location.hash;
      var pos = curWwwPath.indexOf(pathName);
      // 获取主机地址，如： http://localhost:8080
      var localhostPath = curWwwPath.substring(0, pos);
      this.dialogImageUrl = localhostPath + file.url;
      this.dialogVisible = true;
    },
    //图形展示
    initChart() {},
    // 业务方法
    doQuery(page = 1, limit = 20) {},
    //工程概况
    getParams() {
      debugger;
      //获取安全等级，施工工况，工程状态下拉列表
      getSafety().then(res => {
        this.safetyOption = res.data;
      });
      getStep().then(res => {
        this.stepOption = res.data;
      });
      getState().then(res => {
        this.stateOption = res.data;
      });
      this.type = this.$route.params.editType;
      if (this.type == "修改") {
        //取到路由传参
        debugger;
        console.log(this.projectInfo);
        this.projectInfo = this.$route.params.projectInfo;
        this.projectId = this.projectInfo.projectUuid;
        this.projectName = this.projectInfo.projectName;
        $("#projectCode").val(this.projectInfo.projectCode);
        $("#superviseCode").val(this.projectInfo.superviseCode);
        $("#projectName").val(this.projectInfo.projectName);
        $("#projectLocation").val(this.projectInfo.projectLocation);
        this.location = this.projectInfo.projectLatLon;
        $("#projectRegion").val(this.projectInfo.projectRegion);
        $("#supportingStructure").val(this.projectInfo.supportingStructure);
        $("#safetyClass").val(this.projectInfo.safetyClass);
        $("#foundationDepth").val(this.projectInfo.foundationDepth);
        $("#foundationPerimeter").val(this.projectInfo.foundationPerimeter);
        $("#excavationDatePlaned").val(this.projectInfo.excavationDatePlaned);
        $("#backfillDatePlaned").val(this.projectInfo.backfillDatePlaned);
        $("#excavationDateActual").val(this.projectInfo.excavationDateActual);
        $("#backfillDateActual").val(this.projectInfo.backfillDateActual);
        $("#constructionStep").val(this.projectInfo.constructionStep);
        $("#constructionState").val(this.projectInfo.constructionState);
        $("#monitoringOrg").val(this.projectInfo.monitoringOrg);
        $("#monitoringHead").val(this.projectInfo.monitoringHead);
        $("#monitoringSurveyor").val(this.projectInfo.monitoringSurveyor);
        $("#supervisorOrg").val(this.projectInfo.supervisorOrg);
        $("#supervisorLinkman").val(this.projectInfo.supervisorLinkman);
        $("#proprietorOrg").val(this.projectInfo.proprietorOrg);
        $("#proprietorLinkman").val(this.projectInfo.proprietorLinkman);
        $("#designOrg").val(this.projectInfo.designOrg);
        $("#designLinkman").val(this.projectInfo.designLinkman);
        $("#constructionOrg").val(this.projectInfo.constructionOrg);
        $("#constructionLinkman").val(this.projectInfo.constructionLinkman);
        $("#supervisionOrg").val(this.projectInfo.supervisionOrg);
        $("#supervisionLinkman").val(this.projectInfo.supervisionLinkman);
        $("#admDepartment").val(this.projectInfo.admDepartment);
        $("#createDate").val(
          this.changeTimeFormat(this.projectInfo.createDate)
        );
        $("#finishDate").val(
          this.changeTimeFormat(this.projectInfo.finishDate)
        );
        $("#projectDetail").val(this.projectInfo.projectDetail);
      } else if (this.type == "创建") {
      }
    },
    getFdSetList() {
      getFdSet({ token: this.token, projectUuid: this.projectId }).then(res => {
        this.items = res.data.data;
        this.pagination.total = res.data.data.length;
        this.barSearch.alertText = `共 ${this.pagination.total} 条记录`;
        this.listLoading = false;
      });
    },
    //跳转tab之前
    beforeClick: function(activeName, oldActiveName) {
      debugger;
      if (this.projectId != "" && this.projectId != null) {
        if (activeName == "second-ta") {
          //上传文件的列表
          this.getAllFile();
        } else if (activeName == "third-ta") {
          this.getAllPic();
        }
      } else {
        this.$message({
          type: "warning",
          message: "请先新建工程!"
        });
        return false;
      }
    },
    // UI方法
    handleRest() {
      this.formSearch = {
        user: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        state: ""
      };
    },
    // 格式化时间
    changeTimeFormat(val) {
      debugger;
      var d = new Date(val);
      var times =
        d.getFullYear() +
        "-" +
        ("0" + (d.getMonth() + 1)).slice(-2) + //月份+1.因为getMonth是0——11
        "-" +
        ("0" + d.getDate()).slice(-2) +
        " " +
        ("0" + d.getHours()).slice(-2) +
        ":" +
        ("0" + d.getMinutes()).slice(-2) +
        ":" +
        ("0" + d.getSeconds()).slice(-2);
      return times;
    },
    //报警设置
    warningClick(monitorItemUuid) {
      this.$refs.warningModel.dialogFormV(monitorItemUuid);
    },
    sectionClick(monitorItemUuid) {
      this.$refs.sectionModel.dialogFormV(monitorItemUuid);
    },
    surveypointClick(monitorItemUuid) {
      this.$refs.surveypointModel.dialogFormV(monitorItemUuid);
    },
    //关闭监测项新增窗口
    handleCloseFd() {
      this.$refs.editFd.dialogFormH();
    },
    //关闭报警设置
    handleCloseWarning() {
      this.$refs.warningModel.dialogFormH();
    },
    //关闭断面设置
    handleCloseSection() {
      this.$refs.sectionModel.dialogFormH();
    },
    //关闭监测点设置
    handleCloseSurveypoint() {
      this.$refs.surveypointModel.dialogFormH();
    },
    handleExpand() {
      this.barSearch.expandInputs = !this.barSearch.expandInputs;
      this.barSearch.expandBtnText = this.barSearch.expandInputs
        ? "收起▲"
        : "展开▼";
    },
    handleSearch() {
      this.doQuery();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val, this.multipleSelection);
    },
    handleSizeChange(val) {
      this.doQuery(1, val);
    },
    handleCurrentChange(val) {
      this.doQuery(val, this.pagination.pageSize);
    },
    handleClose() {
      this.$confirm("确认关闭？")
        .then(ret => {
          console.log(ret);
          this.dialogVisible = false;
        })
        .catch(ret => {
          console.log(ret);
        });
    },
    handleNew() {
      // this.formData = {
      //   title: "",
      //   author: "",
      //   type: ""
      // };
      // this.dialogVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleEdit(item) {
      // this.formData = {
      //   ...item
      // };
      // this.dialogVisible = true;
      // this.$nextTick(() => {
      //   this.$refs["dataForm"].clearValidate();
      // });
    },
    handleSave(isSave) {
      if (isSave) {
        this.$refs["dataForm"].validate(valid => {
          if (valid) {
            this.dialogVisible = false;
            this.$message({
              message: "保存成功",
              type: "success"
            });
          } else {
            return false;
          }
        });
      } else {
        this.dialogVisible = false;
      }
    },
    handleDelete(item) {
      this.$confirm("确认删除？")
        .then(ret => {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          console.log(ret);
        })
        .catch(ret => {
          console.log(ret);
        });
    },
    getBack() {
      this.$router.push({ path: "/itemList" });
    },
    removeFd(monitorItemUuid) {
      this.$confirm("此操作将永久删除设备 " + ", 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          removeFdSet({ monitorItemUuid, token: this.token })
            .then(response => {
              debugger;
              if (response.data.result == 1) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getFdSetList();
              } else {
                this.$message({
                  type: "warning",
                  message: response.data.message
                });
              }
            })
            .catch(response => {
              this.$message.error("删除失败!");
            });
        })
        .catch(() => {
          this.$message.info("已取消操作!");
        });
    },
    //修改table header的背景色和居中显示
    tableHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background-color:#fff2ec;;color: #000000;text-align:center;";
      }
    }
  },
  created() {},
  // 挂载结束
  mounted() {
    //dom初始化完成，填充表格
    this.getParams();
    //监测项设置的数据源
    this.getFdSetList();
    //获取当前登陆人员的信息
    this.getDetil();
  },
  watch: {
    //监测路由变化
    $route: "getParams"
  }
};
</script>
<style rel="stylesheet/css" scoped>
.alert {
  margin: 10px 0px 0px 0px;
}
.pagination {
  margin-top: 10px;
  text-align: right;
}
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #ffffff !important;
}

.tableEditDetail {
  border-collapse: separate;
  border-spacing: 1px;
}

.tableEditDetail input {
  margin: 5px 0px 5px 0px !important;
  padding: 0 !important;
}

.tableEditDetail input:focus,
textarea:focus {
  border-color: #03a9f4;
  box-shadow: 0 0 15px #03a9f4;
  -webkit-box-shadow: 0 0 15px #03a9f4;
  -moz-box-shadow: 0 0 15px #03a9f4;
}

input {
  width: 60%;
  height: 20px;
  font-size: 12px;
  border: 1px solid #7f9db9;
  line-height: 20px;
}
textarea {
  overflow: hidden;
  vertical-aglin: middle;
  line-height: 30px;
  width: 80%;
}
.easyui-combobox {
  height: 30px;
  line-hgiht: 30px;
}

.tableEditDetail {
  color: #000;
}
/*按钮样式*/
.btton133 {
  width: 133px;
  height: 29px;
  font-size: 12px;
  line-height: 29px;
  border-style: none;
  border-color: inherit;
  border-width: medium;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 3px;
}

.btton85 {
  width: 85px;
  height: 22px;
  font-size: 12px;
  line-height: 22px;
  border-style: none;
  border-color: inherit;
  border-width: medium;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 3px;
}

/*自定义表头风格2*/
.tableListTitle2 {
  color: #237fd2;
  height: 25px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding-top: 5px;
}
/*头部提示地址表格样式*/
#tableHeader {
  width: 100%;
  height: 43px;
  margin: 0 auto;
  border: 0px;
  font-size: 12px;
  background-image: url(./../assets/images/normal_05.gif);
}

#tableHeader th {
  width: 573px;
  height: 43px;
  color: #237fd2;
  text-align: left;
  font-weight: normal;
  padding-left: 35px;
  background-image: url(./../assets/images/normal_03.gif);
  background-repeat: no-repeat;
}

#tableHeader td {
  font-size: 12px;
  text-align: right;
  margin-right: 10px;
}

.topTool {
  border: 1px solid #d0e2f8;
}

/*编辑详情表格样式*/
.tableEditDetail {
  width: 99%;
  margin: 5px 0;
  font-size: 12px;
  table-layout: fixed;
  background-color: #cad8e6;
}

.tableEditDetail th {
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-weight: normal;
  background-color: #f0faff;
}

.tableEditDetail td {
  height: 40px;
  line-height: 40px;
  text-align: left;
  padding-left: 5px;
  word-wrap: break-word;
  background-color: #fafafa;
}

.tableEditDetail td .span {
  color: Red;
}

/*表格自动换行*/
.ui-jqgrid tr.jqgrow td {
  white-space: normal !important;
  height: auto;
  vertical-align: middle;
}
</style>
