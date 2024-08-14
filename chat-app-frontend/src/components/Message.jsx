import PropTypes from "prop-types";
import { cn } from "../utils/index.js";

const Message = ({ data, isSender = false }) => {
  let additionalStyle;

  if (isSender) additionalStyle = "justify-end ml-32";
  else additionalStyle = "justify-start mr-32";

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const textColor = `text-[${data.colorHEX}]`;
  const bgColor = `bg-[${data.colorHEX}]`;

  return (
    <div className={cn("flex gap-2 items-end", additionalStyle)}>
      {!isSender && (
        <div
          className={cn(
            "w-10 h-10 rounded-full flex-none flex justify-center items-center",
            bgColor,
          )}
        >
          {data.sender[0]}
        </div>
      )}

      <div>
        <div className={cn("text-xs mb-1 ml-2 font-medium", textColor)}>
          {data.sender}
        </div>
        <div
          className={`bg-slate-700 py-2 px-4 rounded-xl relative pb-6 text-slate-200`}
        >
          {data.message}
          <div className="absolute bottom-2 right-2 text-xs text-lime-300 ml-2">
            {new Date(data.createdAt).toLocaleTimeString([], options)}
          </div>
        </div>
      </div>

      {isSender && (
        <div
          className={cn(
            "w-10 h-10 rounded-full flex-none flex justify-center items-center",
            bgColor,
          )}
        >
          {data.sender[0]}
        </div>
      )}
    </div>
  );
};

Message.propTypes = {
  data: PropTypes.object.isRequired,
  isSender: PropTypes.bool,
};

export default Message;
