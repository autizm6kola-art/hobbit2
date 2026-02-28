
// import React from 'react';
// import TasksPage from './TasksPage';

// function TasksPageWrapper({ allTasks, selectedRange, goBack }) {
//   if (!selectedRange || !allTasks.length) {
//     return <div>Загрузка...</div>;
//   }

//   // Разбор диапазона, например "1-10"
//   const [start, end] = selectedRange.split('-').map(Number);

//   // Фильтруем задачи из нужного диапазона
//   const selectedTasks = allTasks.filter(task => task.id >= start && task.id <= end);

//   if (selectedTasks.length === 0) {
//     return <div>Нет задач</div>;
//   }

//   return (
//     <TasksPage
//       tasks={selectedTasks}
//       goBack={goBack}
//       rangeLabel={`${start}–${end}`} // Можно передать для заголовка
//     />
//   );
// }

// export default TasksPageWrapper;


import React, { useMemo } from 'react';
import TasksPage from './TasksPage';

function TasksPageWrapper({
  allTasks,
  selectedRange,
  setSelectedRange,
  goBack
}) {
  const rangeSize = 100;

  // 1️⃣ Создаём все диапазоны, как в меню
  const ranges = useMemo(() => {
    const result = [];
    for (let i = 0; i < allTasks.length; i += rangeSize) {
      const slice = allTasks.slice(i, i + rangeSize);
      const startId = slice[0].id;
      const endId = slice[slice.length - 1].id;

      result.push({
        key: `${startId}-${endId}`,
        tasks: slice
      });
    }
    return result;
  }, [allTasks]);

  // 2️⃣ Находим текущий индекс
  const currentIndex = ranges.findIndex(
    r => r.key === selectedRange
  );

  if (currentIndex === -1) {
    return <div>Диапазон не найден</div>;
  }

  const currentTasks = ranges[currentIndex].tasks;

  // 3️⃣ Навигация
  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedRange(ranges[currentIndex - 1].key);
    }
  };

  const goToNext = () => {
    if (currentIndex < ranges.length - 1) {
      setSelectedRange(ranges[currentIndex + 1].key);
    }
  };

  return (
    <TasksPage
      tasks={currentTasks}
      goBack={goBack}
      rangeIndex={currentIndex}
      totalRanges={ranges.length}
      goToPrev={goToPrev}
      goToNext={goToNext}
    />
  );
}

export default TasksPageWrapper;
