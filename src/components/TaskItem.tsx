import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";

import trashIcon from "../assets/icons/trash/trash.png";
import editIcon from "../assets/icons/trash/pen.png";
import closeIcon from "../assets/icons/trash/X.png";

interface PropsEdit {
  id: number | null;
  status: boolean;
}

interface TasksItemProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, newTaskTitle: string) => void;
  item: Task;
  index: number;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
}
export const TaskItem = ({
  editTask,
  index,
  item,
  removeTask,
  tasks,
  toggleTaskDone,
}: TasksItemProps) => {
  const [isEditing, setIsediting] = useState<PropsEdit>({
    id: null,
    status: false,
  });
  const textInputRef = useRef<TextInput>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  const handleStartEditing = (id: number) => {
    setTitle(tasks.find((task) => task.id === id)!.title);
    setIsediting({ status: true, id: id });
  };

  const handleCancelEditing = () => {
    setIsediting({ status: false, id: null });
    setTitle("");
  };

  const handleSubmitEditing = (id: number) => {
    editTask(id, title);
    setIsediting({ status: false, id: null });
    setTitle("");
  };

  return (
    <View style={styles.Container}>
      {isEditing && isEditing.id == item.id ? (
        <View style={styles.itemEdit}>
          <TouchableOpacity
            style={[item.done ? styles.taskMarkerDone : styles.taskMarker]}
            testID={`marker-${index}`}
            onPress={() => toggleTaskDone(item.id)}
          >
            {item.done && <Icon name="check" size={12} color="#FFF" />}
          </TouchableOpacity>
          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={title}
            editable={isEditing.status}
            onChangeText={setTitle}
            onSubmitEditing={() => {
              handleSubmitEditing(item.id);
            }}
          />
        </View>
      ) : (
        <View>
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => toggleTaskDone(item.id)}
          >
            <View
              style={[item.done ? styles.taskMarkerDone : styles.taskMarker]}
              testID={`marker-${index}`}
            >
              {item.done && <Icon name="check" size={12} color="#FFF" />}
            </View>

            <Text style={[item.done ? styles.taskTextDone : styles.taskText]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.icons}>
        {isEditing && isEditing.id == item.id ? (
          <TouchableOpacity
            style={{ paddingHorizontal: 24 }}
            testID={`button-edit-${index}`}
            activeOpacity={0.7}
            onPress={handleCancelEditing}
          >
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => handleStartEditing(item.id)}
            >
              <Image source={editIcon} />
            </TouchableOpacity>
            <TouchableOpacity
              testID={`trash-${index}`}
              style={{ paddingHorizontal: 24 }}
              onPress={() => removeTask(item.id)}
            >
              <Image source={trashIcon} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  icons: {
    flexDirection: "row",
  },
  Container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemEdit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});
