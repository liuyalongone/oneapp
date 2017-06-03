    <template>
         <footer>
         <slot>

        </slot>
      </footer>
    </template>


    <script >
        export default {

        }
    </script>


    <style lang="scss" scoped>
        footer{
            position: fixed;
            height:.8rem;
            width:100%;
            height: 8%;
            bottom: 0px;
            left:0px;
            background: #fff;
            z-index:2;
            ul {
              display: flex;
              height:100%;
              li {
                flex:1;
                height:100%;
                line-height: 100%;
                text-align: center;
                list-style: none;
                color:#888;
                &.ycActive{
                  color:red
                }
                p{
                    padding:.2rem;
                    font-size:2rem;
                  }
            }

          }
        }
    </style>