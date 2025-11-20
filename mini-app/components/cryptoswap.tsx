"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

const currencies = ["BTC", "ETH", "USDT", "BNB", "SOL"];

export default function CryptoSwap() {
  const [from, setFrom] = useState(currencies[0]);
  const [to, setTo] = useState(currencies[1]);
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState(0);
  const [summary, setSummary] = useState<{
    send: string;
    receive: string;
    fee: string;
  } | null>(null);

  useEffect(() => {
    // mock fetch rate
    const fetchRate = async () => {
      const r = Math.random() + 0.5; // random between 0.5 and 1.5
      setRate(r);
    };
    fetchRate();
  }, [from, to]);

  const handleSwap = () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    const fee = (amt * 0.01).toFixed(8);
    const receive = (amt * rate - parseFloat(fee)).toFixed(8);
    setSummary({
      send: `${amt.toFixed(8)} ${from}`,
      receive: `${receive} ${to}`,
      fee: `${fee} ${from}`,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <h2 className="text-xl font-semibold">CryptoSwap</h2>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="text-sm text-muted-foreground">
          Current rate: 1 {from} = {rate.toFixed(6)} {to}
        </div>
        <Button onClick={handleSwap} className="w-full">
          Swap
        </Button>
        {summary && (
          <div className="mt-4 p-4 bg-muted rounded">
            <p>Send: {summary.send}</p>
            <p>Receive: {summary.receive}</p>
            <p>Fee: {summary.fee}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
