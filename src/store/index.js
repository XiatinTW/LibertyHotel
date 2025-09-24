import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // 狀態管理 
  // state -> state
  state: {
    // 查看房間日期範圍
    dateRange: [] // [startDate, endDate]
  },
  // 變更狀態的方法 
  // mutations -> state
  mutations: {
    // 設定房間日期範圍
    setDateRange(state, payload) {
      state.dateRange = payload;
    }
  },
  // 可觸發 mutations 的方法 
  // actions -> mutations
  actions: {
    // 更新房間日期範圍
    updateDateRange({ commit }, payload) {
      commit('setDateRange', payload);
    }
  },
  // 分派狀態 
  // getters -> state
  getters: {
    // 取的房間日期範圍
    dateRange: state => state.dateRange,
      // 格式化顯示日期範圍
      displayDate: state => {
        // 格式化 JS Date 物件為 YYYY-MM-DD
        const formatDate = d => {
          if (!d) return '';
          if (typeof d === 'string') return d;
          if (d instanceof Date) {
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
          }
          if (d.format) return d.format('YYYY-MM-DD');
          return String(d);
        };
        if (state.dateRange && state.dateRange.length === 2) {
          return `${formatDate(state.dateRange[0])} ~ ${formatDate(state.dateRange[1])}`;
        }
        return '';
      }
  }
});
