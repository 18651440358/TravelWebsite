export default {
    data() {
        return {
            dropdownLeft: 0,
            dropdownTop: 0
        }
    },
    methods: {
        /**
         * @description 递归遍历当前组件下面所有与组件名称相匹配的组件，并触发目标事件并传参
         * @param {Vue[]} target 当前组件
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {Any[]} params 需要传递的参数
         * @return {Void}
         */
        broadcast(target, componentName, eventName, params = []) {
            let me = this
            target.forEach(function(child) {
                let name = child.$options.componentName
                if (name === componentName) {
                    child.$emit.apply(child, [eventName, ...params])
                } else {
                    me.broadcast(child.$children, componentName, eventName, params)
                }
            })
        },
        /**
         * @description 逆向递归寻找当前组件的父组件，然后emit事件并传递参数
         * @param {Vue} target 当前组件
         * @param {String} componentName 组件名称
         * @param {String} eventName 需要触发的事件名称
         * @param {Any[]} params 需要传递的参数
         * @return {Void}
         */
        dispatch(target, componentName, eventName, params = []) {
            let name
            if (!(name = target.$options.componentName)) return
            if (name === componentName) {
                target.$emit.apply(target, [eventName, ...params])
            } else {
                this.dispatch(target.$parent, componentName, eventName, params)
            }
        },
        /**
         * @description 递归为目标元素的父元素绑定滚动事件，并执行callback
         * @param {Element} $el 目标元素
         * @param {Function} callback 回调函数
         * @return {Void}
         */
        scrollHandle($el, callback = () => {}) {
            let target
            // eslint-disable-next-line no-cond-assign
            if (target = $el.parentElement) {
                target.addEventListener("scroll", callback)
                this.scrollHandle(target, callback)
            }
        },
        position($el, $target){
            if (!$el || !$target) return

            var triggerPos = $el.getBoundingClientRect()
            var dropdownPos = $target.getBoundingClientRect()
            var winW = window.innerWidth;
            var winH = window.innerHeight;

            // y轴
            if ((winH - triggerPos.top - triggerPos.height - 20) >= dropdownPos.height){
                // 可以放在下方
                this.dropdownTop = triggerPos.top + triggerPos.height
            }else if(triggerPos.top + 20 >= dropdownPos.height) {
                // 可以放在上方
                this.dropdownTop = triggerPos.top - dropdownPos.height
            }else {
                // 沉底30
                this.dropdownTop = winH - 20 - dropdownPos.height
            }

            // x轴
            if ((winW - triggerPos.left - triggerPos.width - 20) >= dropdownPos.width){
                this.dropdownLeft = triggerPos.left
            }else if (triggerPos.left - 20 >= dropdownPos.width){
                this.dropdownLeft = triggerPos.left + triggerPos.width - dropdownPos.width
            }else {
                this.dropdownLeft = 20
            }
        }
    }
}
