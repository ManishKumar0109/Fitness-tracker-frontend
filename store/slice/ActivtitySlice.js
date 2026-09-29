

export const ActivitySlice=(set,get)=>({
    todayActivity:null,
    weeklyActivity:null,
    saveTodayActivity:(value)=>set({todayActivity:value}),
    saveWeeklyActivity:(value)=>set({weeklyActivity:value}),
    deleteActivityInfo:()=>set({dailyActivity:null,weeklyActivity:null})

})