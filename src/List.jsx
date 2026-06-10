import {} from "react";

const items = [
  { task: "learn react", icon: "gg", isCompleted: true },
  { task: "learn 22react", icon: "ff", isCompleted: false },
  { task: "33learn react", icon: "kk", isCompleted: true },
];
export const List = () => {
  return (
    <div>
      {items.map((item, index) => {
        return (
          <section key={index} className={item.isCompleted ? "completed" : ""}>
            <span>{item.task}</span>
            <h6>{item.icon}</h6>
          </section>
        );
      })}
    </div>
  );
};
