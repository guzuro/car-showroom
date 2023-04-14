<template>
    <div class="wrapper">
        <ul class="models-list">
            <li class="models-list__item" v-for="li in list" :key="li.value" @click="selectModel(li.value)">
                <div class="car-model-wrapper">
                    <img :src="li.img" :alt="li.value">
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import audiImg from '../assets/image/audi.jpg'
import kiaImg from '../assets/image/kia.jpg'
import toyotaImg from '../assets/image/toyota.jpg'
import volkswagenImg from '../assets/image/volkswagen.jpg'

export default defineComponent({
    emits: ['selectModel'],
    setup(_, { emit }) {
        const list = [
            {
                img: audiImg,
                value: "audi"
            },
            {
                img: kiaImg,
                value: "kia"
            },
            {
                img: toyotaImg,
                value: "toyota"
            },
            {
                img: volkswagenImg,
                value: "volkswagen"
            },
        ];

        function selectModel(model: string) {
            emit('selectModel', model)
        }
        return {
            list,
            selectModel
        }
    }
})
</script>

<style scoped lang="scss">
.wrapper {
    overflow: auto;

    .models-list {
        text-align: center;
        white-space: nowrap;

        &__item {
            display: inline-block;
            margin-right: 5px;

            &:last-child {
                margin-right: 0;
            }

            .car-model-wrapper {
                width: 280px;
                height: 150px;
                overflow: hidden;
                cursor: pointer;

                img {
                    width: inherit;
                    height: inherit;
                    border-radius: 4px;
                    transition: 0.3s;

                    &:hover {
                        transform: scale(1.4);
                        opacity: .7;

                    }
                }
            }

        }
    }

}
</style>