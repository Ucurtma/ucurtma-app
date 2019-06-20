import cls from "classnames";

function Card() {
  return (
    <div className={cls("card")}>
      <style jsx>
        {`
          .card {
            background: #fff;
            box-shadow: var(--shadow);
          }
        `}
      </style>
      Card
    </div>
  );
}

export default Card;
