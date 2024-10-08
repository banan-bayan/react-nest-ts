const Status = 'New'
const EmptyPlanMarks = []
const isDisable = (Status === 'New' && !EmptyPlanMarks?.length);

console.log('заблокировано? : ', !isDisable)