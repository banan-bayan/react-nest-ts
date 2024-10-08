const Status = 'h'
const EmptyPlanMarks = []
const isDisable = (Status === 'New' && EmptyPlanMarks?.length);

console.log('заблокировано? : ', !isDisable)