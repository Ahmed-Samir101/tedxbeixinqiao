"use client";

import { useEffect, useRef } from "react";

const GRID_SIZE = 20;
const SHADOW_OFFSET = 2;
const PIN_RADIUS = 10;
const PIN_INNER_RADIUS = 5;
const SHADOW_RADIUS = 8;
const ROAD_LINE_WIDTH = 3;
const LABEL_OFFSET = 30;
const BOTTOM_TEXT_OFFSET = 20;

export default function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for a real Google Maps implementation
    // In a real implementation, you would use the Google Maps JavaScript API

    if (mapRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = mapRef.current.clientWidth;
      canvas.height = mapRef.current.clientHeight;
      mapRef.current.appendChild(canvas);

      const ctx = canvas.getContext("2d");

      // Draw a placeholder map
      if (ctx) {
        // Background
        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Grid lines
        ctx.strokeStyle = "#d1d5db";
        ctx.lineWidth = 1;

        // Horizontal grid lines
        for (let i = 0; i < canvas.height; i += GRID_SIZE) {
          ctx.beginPath();
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
          ctx.stroke();
        }

        // Vertical grid lines
        for (let i = 0; i < canvas.width; i += GRID_SIZE) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
          ctx.stroke();
        }

        // Roads
        ctx.strokeStyle = "#9ca3af";
        ctx.lineWidth = ROAD_LINE_WIDTH;

        // Main road
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Cross road
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        // Location marker
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Pin shadow
        ctx.beginPath();
        ctx.arc(
          centerX,
          centerY + SHADOW_OFFSET,
          SHADOW_RADIUS,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fill();

        // Pin body
        ctx.beginPath();
        ctx.arc(centerX, centerY, PIN_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "#ef4444";
        ctx.fill();

        // Pin inner circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, PIN_INNER_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Map label
        ctx.font = "bold 14px Arial";
        ctx.fillStyle = "#111827";
        ctx.textAlign = "center";
        ctx.fillText("Beixinqiao, Beijing", centerX, centerY + LABEL_OFFSET);

        // Note text
        ctx.font = "12px Arial";
        ctx.fillStyle = "#4b5563";
        ctx.textAlign = "center";
        ctx.fillText(
          "Interactive Google Map would be implemented here",
          centerX,
          canvas.height - BOTTOM_TEXT_OFFSET
        );
      }
    }

    return () => {
      if (mapRef.current) {
        while (mapRef.current.firstChild) {
          mapRef.current.removeChild(mapRef.current.firstChild);
        }
      }
    };
  }, []);

  return (
    <div
      aria-label="Map showing Beixinqiao subdistrict, Dongcheng, Beijing"
      className="h-full w-full rounded-lg bg-gray-100 dark:bg-gray-800"
      ref={mapRef}
      role="img"
    />
  );
}
