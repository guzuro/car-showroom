<template>
    <div class="wrapper">
        <ul class="models-list">
            <li class="models-list__item" v-for="li in list" :key="li.value" @click="selectModel(li.value)">
                <model-list-card :model="li" />
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ModelListCard from './ModelListCard.vue'
import audiImg from '../../assets/image/audi.jpg'
import kiaImg from '../../assets/image/kia.jpg'
import toyotaImg from '../../assets/image/toyota.jpg'
import volkswagenImg from '../../assets/image/volkswagen.jpg'
import type { ModelItem, ModelsList } from './types'

export default defineComponent({
    components: {
        ModelListCard
    },
    emits: ['selectModel'],
    setup(_, { emit }) {
        const list: ModelsList = [
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

        function selectModel(model: ModelItem['value']) {
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
        }
    }

}
</style>