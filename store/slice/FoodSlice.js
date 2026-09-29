
export const FoodSlice=(set,get)=>(
    {
        todayFood:null,
        weeklyFood:null,
        saveTodayFood:(value)=>set({todayFood:value}),
        saveWeeklyFood:(value)=>set({weeklyFood:value}),
        deleteFoodInfo:()=>set({todayFood:null,weeklyFood:null})

    }
)