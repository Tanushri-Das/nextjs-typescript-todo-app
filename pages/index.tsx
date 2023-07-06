import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@@/styles/Home.module.css";
import HomePage from "./HomePage";



export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto">
      <HomePage/>
    </div>
  );
}
