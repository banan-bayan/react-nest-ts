      // const employees =
      //   await this.empTypeService.getEmployeesTypeByIdes(
      //     employeeWorkTypeIds,
      //   ); // достал типы выбранные пользователем, вместе с сотрудниками

      // console.log(employees, 'EMPS difference TYPEs choose user');
      
      // а пользователь может выбирать только один слот времени, на разные типы работ и на разных специалистов ?
      // const  map = employees.map(async ({ id }) => {
      //   const employeeSlots = await this.slotService.getEmployeesSlotsSchedules(id);

      //   const existSlot = employeeSlots.find(({ startDate }) => {
      //     new Date(startDate).getTime() === new Date(startDateWorkRequest).getTime()
      //   });

      //   if (existSlot) {
      //     throw new NotFoundException('Слот уже занят');
      //   }

      //   // тут привязка к работнику + User ID, и обновить слоты
      //   const workRequest = this.workRequestRepository.create({
      //     ...dto,
      //     status: WorkRequestStatus.WAITING,
      //   });
  
      //   // return this.workRequestRepository.save(workRequest);

      // });


      // const employee = employees[0];
      // console.log(employee);

      // const employeeSlots = await this.slotService.getEmployeeSlotsSchedules(
      //   employee.id,
      // );

      // const existSlot = employeeSlots.find(
      //   ({ startDate }) =>
      //     new Date(startDate).getTime() ===
      //     new Date(startDateWorkRequest).getTime(),
      // );

      // if (existSlot) {
      //   throw new NotFoundException('Слот уже занят');
      // }

      // const workRequest = this.workRequestRepository.create({
      //   ...dto,
      //   status: WorkRequestStatus.WAITING,
      // });

      // return this.workRequestRepository.save(workRequest);









// function timeout(text, callback) {
//   setTimeout(() => { 
//       console.log(text);
//       callback();
//   }, 1000)
// }

// async function ogAfterTimeout() {
//   const start = 'start';

//   // пишем код тут :)
//   await new Promise(resolve  => {
//     timeout(start, resolve)
//   })


//   console.log('end');
// }


// const sites = [
//   { id: 1, name: 'site 1' },
//   { id: 2, name: 'site 2' },
// ];

// const pages = [
//   { id: 1121, title: 'page 1', site_id: 1 },
//   { id: 2234, title: 'page 2', site_id: 2 },
//   { id: 3321, title: 'page 3', site_id: 1 },
// ];
// // пример на выходе
// const pagesWithSites = [
//   { id: 1121, title: 'page 1', site: { id: 1, name: 'site 1' } },
//   { id: 2234, title: 'page 2', site: { id: 2, name: 'site 2' } },
//   { id: 3321, title: 'page 3', site: { id: 1, name: 'site 1' } },
// ];


// function joinSitesToPages(sites, pages) {
//   const mapSites = {};

//   sites.forEach(item => {
//     mapSites[item.id] = item;
//   });

//   const data = pages.map(({ id, title, site_id }) => ({
//     id,
//     title,
//     site: mapSites[site_id]
//   }));

//   return data;
// }


// console.log(joinSitesToPages(sites, pages))

// const user = {};
// const id = user.name.id;

// const product = {};
// const { price: { sale } } = product;