<template>
    <draggable
        v-model="rows"
        tag="div"
        item-key="id"
        class="opt-table-mobile"
        ghost-class="ghost"
        chosen-class="chosen"
        animation="200"
        handle=".index-field"
    >
        <template #item="{ element: row, index }">
            <div class="opt-table-mobile__item">
                <div
                    v-for="(col, colIndex) in columns.filter(e => e.hide !== true)"
                    :key="`row-${index}-${colIndex}`"
                    class="item-element"
                    :class="`td-${col.field}-field`"
                    :row-type="col.field"
                >
                    <div class="element-name">
                        {{ col.title }}
                    </div>
                    <div
                        v-if="col.field === 'action'"
                        v-click-outside="() => openActionIndex = -1"
                        class="action-field"
                        @click.stop="openActionIndex = index"
                    >
                        <svg-icon icon="mighty-ellipsis" />
                        <div
                            v-if="index === openActionIndex"
                            class="actions"
                        >
                            <div
                                v-for="(action, actionIndex) in actions"
                                :key="`action-${actionIndex}`"
                                class="action-item"
                            >
                                {{ action }}
                            </div>
                        </div>
                    </div>
                    <div
                        v-else-if="col.field === 'index'"
                        class="index-field"
                    >
                        <svg-icon icon="draggble" />
                        {{ index }}
                    </div>
                    <opt-select
                        v-else-if="col.isSelection"
                        v-model="row[col.field]"
                        :options="tableNames"
                    />
                    <opt-input
                        v-else-if="col.isEditable"
                        v-model="row[col.field]"
                        i-form="table"
                    />
                    <p v-else>
                        {{ row[col.field] }}
                    </p>
                </div>
            </div>
        </template>
    </draggable>
    <opt-table-info :is-mobile="true" />
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useTableStore } from '~/store/table'
const { columns, rows, actions, tableNames } = storeToRefs(useTableStore())
const openActionIndex = ref<number>(-1)

</script>

<style scoped lang="scss">
.opt-table-mobile{
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    &__item{
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: flex-start;
        padding: 15px 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 20px 0 rgba(0,0,0, 0.07);
        border: solid 1px #eeeff1;
        background-color: #fff;
        .item-element{
            width: 100%;
        }
        .action-field{
            position: relative;
            cursor: pointer;
            float: left;
            .actions{
            position: absolute;
            top: -35px;
            left: 10px;
            border-radius: 5px;
            border: solid 1px #eeeff1;
            background-color: #fbfcfd;
            .action-item{
                padding: 5px 15px;
                &:hover{
                    background-color: #eef3f8;
                }
            }
            }
        }
        .element-name{
            margin-bottom: 5px;
            font-size: 10px;
            color: #8f8f8f;
        }
        .index-field{
            cursor: grab;
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 16px;
        }
    }
}
</style>
