import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Other({}: Props) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/movies");
  }, []);

  return <div></div>;
}
