import React from "react";

const CategoryGroup = ({
  items,
  selectedItem,
  valueProperty,
  textProperty,
  onCategorySelect,
}) => {
  return (
    <div>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item[valueProperty]}
            onClick={() => onCategorySelect(item)}
            className={
              item === selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
          >
            {item[textProperty]}
          </li>
        ))}
      </ul>
    </div>
  );
};

//My mistake: I wrote defaultCategory instead of defaultProps
CategoryGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default CategoryGroup;
