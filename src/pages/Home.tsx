import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const id = new Date().getTime();
    const taskExist = tasks.filter((task) => task.title === newTaskTitle);
    if (taskExist.length != 0) {
      Alert.alert("Task already exists");
      return;
    }
    setTasks([
      ...tasks,
      {
        id: Number(id),
        title: newTaskTitle,
        done: false,
      },
    ]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }
  function handleEditTask(id: number, newTaskTitle: string) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTaskTitle } : task
      )
    );
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Deletar",
      "Tem certeza que quer deletar?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
        },
      ],
      {
        cancelable: true,
      }
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        editTask={handleEditTask}
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
