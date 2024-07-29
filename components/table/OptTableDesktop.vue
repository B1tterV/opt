<template>
    <div class="opt-table-desktop">
        <div class="opt-table-desktop__actions">
            <div
                class="action-button"
            >
                <svg-icon
                    icon="settings"
                    @click="tableSettingsIsOpen = !tableSettingsIsOpen"
                />
                <opt-table-settings
                    v-if="tableSettingsIsOpen"
                    v-click-outside="() => tableSettingsIsOpen = false"
                    :items="[{name: 'Отображение столбцов', component: 'opt-toggle-cols'}]"
                />
            </div>
        </div>
        <div class="table-container">
            <table class="opt-table-desktop__table">
                <thead>
                    <draggable
                        v-model="columns"
                        tag="tr"
                        item-key="id"
                        ghost-class="ghost"
                        chosen-class="chosen"
                        animation="200"
                        handle=".row .name"
                    >
                        <template #item="{ element: col, index }">
                            <th
                                v-if="!col.hide"
                                :style="{ 'min-width': col.width, 'max-width': col.width}"
                            >
                                <div class="row">
                                    <div class="name">
                                        {{ col.title }}
                                    </div>
                                    <div
                                        class="draggble-line"
                                        @mousedown="startResize($event, index)"
                                        @mouseup="stopResize()"
                                    />
                                </div>
                            </th>
                        </template>
                    </draggable>
                </thead>
                <draggable
                    v-if="rows.length > 0"
                    v-model="rows"
                    tag="tbody"
                    item-key="id"
                    ghost-class="ghost"
                    chosen-class="chosen"
                    animation="200"
                    handle=".index-field"
                    @start="onDragStart"
                    @end="onDragEnd"
                >
                    <template #item="{ element: row, index }">
                        <tr>
                            <td
                                v-for="(col, colIndex) in columns.filter(e => e.hide !== true)"
                                :key="`row-${index}-${colIndex}`"
                                :style="{ 'min-width': col.width, 'max-width': col.width }"
                                :class="`td-${col.field}-field`"
                                :row-type="col.field"
                            >
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
                            </td>
                        </tr>
                    </template>
                </draggable>
                <div
                    v-if="showLine"
                    class="drop-line"
                />
            </table>
        </div>
        <opt-table-info />
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useTableStore } from '~/store/table'
const { columns, rows, actions, tableNames, tableSettingsIsOpen } = storeToRefs(useTableStore())

const isColumnResize = ref<any>({ isResize: false, index: null, startX: 0, startWidth: 0, dataName: null })

const showLine = ref(false)
const openActionIndex = ref<number>(-1)

const onDragStart = () => {
  showLine.value = true
}

const onDragEnd = () => {
  showLine.value = false
}

const addBorderRight = (dataName: string) => {
  const tds = document.querySelectorAll(`.opt-table__table tbody tr td[row-type*="${dataName}"]`)
  tds.forEach((td) => {
    (td as HTMLElement).style.borderRight = '1px solid #eeeff1'
  })
}

const removeBorderRight = (dataName: string) => {
  const tds = document.querySelectorAll(`.opt-table__table tbody tr td[row-type*="${dataName}"]`)
  tds.forEach((td) => {
    (td as HTMLElement).style.borderRight = ''
  })
}

const startResize = (event: MouseEvent, index: number) => {
  const target = event.target as HTMLElement
  const parent = target.parentElement?.parentElement as HTMLElement
  const dataName = columns.value[index].field
  if (parent) {
    isColumnResize.value.isResize = true
    isColumnResize.value.index = index
    isColumnResize.value.startX = event.clientX
    isColumnResize.value.dataName = dataName
    isColumnResize.value.startWidth = parseInt(window.getComputedStyle(parent).width)
    addBorderRight(dataName)
    window.addEventListener('mousemove', changeColumnWidth)
    window.addEventListener('mouseup', stopResize)
  }
}

const changeColumnWidth = (event: MouseEvent) => {
  if (!isColumnResize.value.isResize) { return }
  const index = isColumnResize.value.index
  const startX = isColumnResize.value.startX
  const startWidth = isColumnResize.value.startWidth
  const newWidth = startWidth + (event.clientX - startX)
  if (newWidth > 30) {
    columns.value[index].width = `${newWidth}px`
  }
}

const stopResize = () => {
  if (isColumnResize.value.isResize) {
    removeBorderRight(isColumnResize.value.dataName)
  }
  isColumnResize.value.isResize = false
  isColumnResize.value.index = null
  window.removeEventListener('mousemove', changeColumnWidth)
  window.removeEventListener('mouseup', stopResize)
}
</script>

<style scoped lang="scss">

.opt-table-desktop{
  box-shadow: 0 5px 20px 0 rgba(0,0,0, 0.07);
  border: solid 1px #eeeff1;
  background-color: #fff;
  border-radius: 10px;
  padding-bottom: 25px;
  &__actions{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 15px;
    height: 32px;
    border-bottom: 1px solid #eeeff1;
    .action-button{
        cursor: pointer;
        position: relative;
    }
  }
  .table-container{
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    &::-webkit-scrollbar {
        display: none;
    }
  }
  &__table{
    user-select: none;
    margin-bottom: 15px;
    thead{
        tr{
            th{
                position: relative;
                padding: 0 10px;
                text-align: left;
                height: 45px;
                border-bottom: 1px solid #eeeff1;
                white-space: nowrap;
                font-size: 16px;
                font-weight: 600;
                overflow: hidden;
                border-right: 1px solid #eeeff1;
                .row{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .name{
                        height: 35px;
                        width: 100%;
                    }
                    .draggble-line{
                        cursor: col-resize;
                        right: 0;
                        width: 10px;
                        height: 100%;
                        position: absolute;
                    }
                }
            }
        }
    }
    tbody{
        tr{
            td{
                padding: 0 10px;
                text-align: left;
                height: 45px;
                white-space: nowrap;
                overflow: visible;
                input{
                    height: 35px !important;
                }
                .index-field{
                    cursor: grab;
                    display: flex;
                    align-items: center;
                    gap: 5px;
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
                &.td-action-field{
                  overflow: visible;
                }
            }
        }
    }
  }
}

.ghost {
  opacity: 0;
}

.chosen {
  height: 45px;
  width: 100%;
  border-radius: 5px;
  border: dashed 2px #a6b7d4;
  background-color: #fbfcfd;
}

.drop-line {
  position: absolute;
  display: none;
  top: 0;
  height: 45px;
  width: 100%;
  border-radius: 5px;
  border: solid 2px #a6b7d4;
  background-color: #fbfcfd;
  z-index: 10;
}
</style>
