/* eslint-disable react/prop-types */
import { useState, useRef, useLayoutEffect } from "react";
import { Box, Button } from "@mui/material";

const VariantRow = ({ product, selectedVariants, setSelectedVariants }) => {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(product.usingVariant?.values?.length || 0);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    let totalWidth = 0;
    let count = 0;

    const buttons = Array.from(containerRef.current.children);
    for (let btn of buttons) {
      const btnWidth = btn.offsetWidth + 5;
      if (totalWidth + btnWidth <= containerWidth) {
        totalWidth += btnWidth;
        count++;
      } else break;
    }

    if (count < product.usingVariant.values.length) {
      setVisibleCount(count - 1);
    } else {
      setVisibleCount(count);
    }
  }, [product.usingVariant?.values]);

  const variants = product.usingVariant?.values || [];

  return (
    <Box
      ref={containerRef}
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center",
        gap: 0.5,
        paddingBottom: '10px',
        overflow: "hidden",
        width: "100%",
      }}
    >
      {variants.slice(0, visibleCount).map((variant, idx) => {
        const isSelected = selectedVariants[product.id] === variant;
        return (
          <Button
            key={idx}
            variant={isSelected ? "contained" : "outlined"}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVariants((prev) => ({
                ...prev,
                [product.id]: variant,
              }));
            }}
            sx={{
              fontSize: "11px",
              textOverflow: 'ellipsis',
              px: 0.5,
              height: 24,
              borderRadius: "12px",
              textTransform: "none",
              backgroundColor: isSelected
                ? "var(--color-primary)"
                : "transparent",
              color: isSelected
                ? "var(--color-text-inverse)"
                : "var(--color-primary)",
              border: isSelected
                ? "2px solid var(--color-secondary)"
                : "1px solid var(--color-primary)",
              fontWeight: isSelected ? 600 : 500,
              transition: "var(--transition-base)",
              "&:hover": {
                backgroundColor: isSelected
                  ? "var(--color-secondary)"
                  : "#e0f2e0",
              },
            }}
          >
            {variant}
          </Button>
        );
      })}

      {variants.length > visibleCount && (
        <Button
          variant="outlined"
          size="small"
          disabled
          sx={{
            fontSize: "11px",
            minWidth: "20px",
            px: 0.5,
            height: 24,
            borderRadius: "12px",
            textTransform: "none",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: "var(--color-secondary)",
            border: "1px solid var(--color-secondary)",
            "&.Mui-disabled": {
              color: "var(--color-secondary)",
              border: "1px solid var(--color-secondary)",
              opacity: 1,
            },
          }}
        >
          +{variants.length - visibleCount}
        </Button>
      )}
    </Box>
  );
};

export default VariantRow;