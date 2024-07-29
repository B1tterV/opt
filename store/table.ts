import { defineStore } from 'pinia'
import type { RowInterface } from '@/types/table-types'

export const useTableStore = defineStore('table', {
  state: () => ({
    columns: [
      {
        field: 'index',
        title: 'Номер строки',
        isUnique: true,
        hide: false,
        width: '50px',
        isEditable: false,
        isSelection: false
      },
      { field: 'action', title: 'Действие', hide: false, width: '50px', isEditable: false, isSelection: false },
      { field: 'id', title: 'ID', isUnique: true, hide: true, width: '50px', isEditable: false, isSelection: false },
      { field: 'status', title: 'Статус', hide: true, width: '150px', isEditable: true, isSelection: false },
      { field: 'phone', title: 'Телефон', hide: false, width: '150px', isEditable: true, isSelection: false },
      {
        field: 'unitName',
        title: 'Наименование еденицы',
        hide: false,
        width: '350px',
        isEditable: false,
        isSelection: true
      },
      { field: 'price', title: 'Цена', hide: false, width: '150px', isEditable: true, isSelection: false },
      { field: 'qty', title: 'Кол-во', hide: false, width: '150px', isEditable: true, isSelection: false },
      {
        field: 'productName',
        title: 'Название товара',
        hide: false,
        width: '150px',
        isEditable: true,
        isSelection: false
      },
      { field: 'total', title: 'Итого', hide: false, width: '150px', isEditable: true, isSelection: false }
    ] || [],
    rows: [] as RowInterface[],
    actions: ['Создать', 'Изменить', 'Удалить'],
    tableNames: [
      { value: 1, label: 'Мраморный щебень фр. 2-5 мм, 25кг' },
      { value: 2, label: 'Мраморный щебень фр. 2-5 мм, 25кг (белый)' },
      { value: 3, label: 'Мраморный щебень фр. 2-5 мм, 25кг (вайт)' },
      { value: 4, label: 'Мраморный щебень фр. 2-5 мм, 25кг (возврат)' },
      { value: 5, label: 'Мраморный щебень фр. 2-5 мм, 1т' }
    ],
    tableSettingsIsOpen: false,
    tableSettingsTopIsOpen: false
  }),
  actions: {
    generateTestData (): RowInterface[] {
      const units = [
        'Мраморный щебень фр. 2-5 мм, 25кг',
        'Мраморный щебень фр. 2-5 мм, 25кг (белый)',
        'Мраморный щебень фр. 2-5 мм, 25кг (вайт)',
        'Мраморный щебень фр. 2-5 мм, 25кг (возврат)',
        'Мраморный щебень фр. 2-5 мм, 1т'
      ]
      const statuses = ['Активен', 'Неактивен', 'В процессе']
      const actions = ['Создать', 'Изменить', 'Удалить']
      const phoneNumbers = ['+79001234567', '+79101234567', '+79201234567', '+79301234567', '+79401234567']

      return Array.from({ length: 5 }, (_, i) => ({
        index: i + 1,
        id: Math.floor(Math.random() * 10000),
        action: actions[Math.floor(Math.random() * actions.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        phone: phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)],
        unitName: units[Math.floor(Math.random() * units.length)],
        price: (1000 + Math.floor(Math.random() * 1000)).toFixed(2),
        qty: 1 + Math.floor(Math.random() * 10),
        productName: units[Math.floor(Math.random() * units.length)],
        total: (1000 + Math.floor(Math.random() * 1000)).toFixed(2)
      }))
    },
    addRow () {
      this.rows.push({
        index: this.rows.length + 1,
        id: Math.floor(Math.random() * 10000),
        action: '',
        status: '',
        phone: '',
        unitName: '',
        price: '0',
        qty: 1,
        productName: '',
        total: '0'
      })
    }
  }
})
