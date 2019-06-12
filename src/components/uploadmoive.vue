<template>
    <div class="up-movie">
        <el-form label-width="100px" class="formStyle">
            <el-form-item label="电影名称" class="item-style">
                <el-input type="text" v-model="moiveform.movie_name" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="电影简述" class="item-style">
                <el-input type="text" v-model="moiveform.movie_Introduced" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="评分" class="item-style">
                <el-input type="text" v-model="moiveform.good_like" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="主演" class="item-style">
                <el-input type="text" v-model="moiveform.actor_names" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电影标签" class="item-style">
                <el-select v-model="moiveform.movie_show" placeholder="请选择">
                    <el-option
                            v-for="item in movie_show_select"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <div class="movie_type_select">
                <el-checkbox-group v-model="moiveform.movie_type" >
                    <el-checkbox v-for="moiveStyle in moiveStyles" :label="moiveStyle" :key="moiveStyle">{{moiveStyle}}</el-checkbox>
                </el-checkbox-group>
            </div>
            <el-form-item label="上映时间" class="item-style" >
                <el-date-picker
                        style="float: left"
                        v-model="moiveform.show_time"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-form>
        <el-upload class="upload-demo"
                   action="https://jsonplaceholder.typicode.com/posts/"
                   :on-remove="remove"
                   :on-success	="upload"
                   :file-list="moiveform.movie_post"
                   list-type="picture-card"
        >
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
            <el-button class="uploadbtn" type="primary" @click="submitDialogData( )">提交</el-button>
    </div>
</template>

<script>
    import { uploadImgToBase64 } from '../../public/js/tobase64';

    const moiveStyleOptions = ['喜剧', '爱情', '剧情', '科技'];

    export default {
        name: "upLoadMoive",
        data() {
            return {

                moiveStyles: moiveStyleOptions,

                movie_show_select: [{
                    value: 1,
                    label: '轮播'
                }, {
                    value: 2,
                    label: '推荐'
                },{
                    value: 3,
                    label: '不展示'
                }],
                moiveform: {
                    movie_name: "",
                    movie_post: [],
                    movie_Introduced: "",
                    actor_names: "",
                    show_time:"",
                    movie_type:[ ],
                    movie_show:"",
                    good_like:"",
                },
            };
        },
        methods: {
            remove (file,fileList) {
                this.moiveform.movie_post = fileList;
                
            },
            upload(response,file,fileList){
                this.moiveform.movie_post.push(file);
                    
            },
            async submitDialogData () {
                    const imgBroadcastListBase64 = [];
                    // 并发 转码轮播图片list => base64
                    const filePromises = this.moiveform.movie_post.map(async file => {
                        const response = await uploadImgToBase64(file.raw);
                        return response.result.replace(/.*;base64,/, '') // 去掉data:image/jpeg;base64,
                    });
                    // 按次序输出 base64图片
                    for (const textPromise of filePromises) {
                        imgBroadcastListBase64.push(await textPromise)
                    }
                    this.moiveform.movie_post = imgBroadcastListBase64;

                this.$http.post("/api/upLoadMoive", this.moiveform)
                    .then(response => {
                        console.log(response);
                    },)
            },

        }
    }
</script>

<style scoped>
    .up-movie{

    }
    .upload-demo{
        display: block;
        width: 250px;
    }
    .formStyle{
        width: 500px;
    }
    .uploadbtn{
        width: 120px;
        margin-right: 150px;
    }
    .movie_type_select{
        margin: 15px 0px;
    }
</style>